job "Acumen-Strapi" {
  datacenters = ["glynac-dc"]
  type = "service"

  update {
    max_parallel     = 1
    health_check     = "task_states"
    min_healthy_time = "30s"
  }

  # ===========================================
  # PostgreSQL Database Group
  # ===========================================
  group "postgres" {
    count = 1
    
    network {
      port "db" {
        static = 7887
        to     = 5432
      }
    }
    
    service {
      name = "acumen-postgres"
      tags = ["database", "postgres"]
      port = "db"
      
      check {
        name     = "postgres-tcp"
        type     = "tcp"
        port     = "db"
        interval = "30s"
        timeout  = "5s"
      }
    }

    constraint {
      attribute = "${attr.unique.hostname}"
      value     = "worker-07"
    }

    task "postgres" {
      driver = "docker"

      config {
        image = "postgres:15-alpine"
        ports = ["db"]
        
        volumes = [
          "/opt/acumen-strapi/postgres-data:/var/lib/postgresql/data"
        ]
      }

      template {
        data = <<EOF
{{ with nomadVar "nomad/jobs/Acumen-Strapi" }}
POSTGRES_DB={{ .DATABASE_NAME }}
POSTGRES_USER={{ .DATABASE_USERNAME }}
POSTGRES_PASSWORD={{ .DATABASE_PASSWORD }}
{{ end }}
EOF
        destination = "secrets/db.env"
        env         = true
      }

      resources {
        cpu    = 200
        memory = 256
      }
    }
  }

  # ===========================================
  # Strapi Application Group
  # ===========================================
  group "strapi-backend" {
    count = 1
    
    # Wait for postgres to be ready
    dependency {
      group = "postgres"
      wait  = "healthy"
    }

    network {
      port "http" {
        static = 5603
        to     = 5603
      }
    }
    
    service {
      name = "acumen-strapi"
      tags = ["apps", "strapi"]
      port = "http"
      
      check {
        name     = "strapi-tcp"
        type     = "tcp"
        port     = "http"
        interval = "30s"
        timeout  = "5s"
      }
    }

    constraint {
      attribute = "${attr.unique.hostname}"
      value     = "worker-07"
    }

    task "strapi" {
      driver = "docker"

      config {
        image = "ghcr.io/friendy21/acumen-blogs/strapi:latest"
        ports = ["http"]
        
        auth {
          username = "friendy21"
          password = "${GHCR_TOKEN}"
        }
      }

      template {
        data = <<EOF
{{ with nomadVar "nomad/jobs/Acumen-Strapi" }}
GHCR_TOKEN={{ .GHCR_TOKEN }}
{{ end }}
EOF
        destination = "secrets/ghcr.env"
        env         = true
      }

      env {
        NODE_ENV = "production"
        HOST     = "0.0.0.0"
        PORT     = "5603"
      }

      template {
        data = <<EOF
{{ with nomadVar "nomad/jobs/Acumen-Strapi" }}
APP_KEYS={{ .APP_KEYS }}
API_TOKEN_SALT={{ .API_TOKEN_SALT }}
ADMIN_JWT_SECRET={{ .ADMIN_JWT_SECRET }}
TRANSFER_TOKEN_SALT={{ .TRANSFER_TOKEN_SALT }}
JWT_SECRET={{ .JWT_SECRET }}
DATABASE_CLIENT=postgres
DATABASE_HOST={{ .DATABASE_HOST }}
DATABASE_PORT=7887
DATABASE_NAME={{ .DATABASE_NAME }}
DATABASE_USERNAME={{ .DATABASE_USERNAME }}
DATABASE_PASSWORD={{ .DATABASE_PASSWORD }}
DATABASE_SSL=false
{{ end }}
EOF
        destination = "secrets/.env"
        env         = true
      }

      resources {
        cpu    = 200
        memory = 256
      }
    }
  }
}
