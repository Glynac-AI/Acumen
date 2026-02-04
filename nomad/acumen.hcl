job "Frontend-Glynac-Agent" {
  datacenters = ["glynac-dc"] #disesuaikan
  type = "service"

  update {
    max_parallel     = 1
    health_check     = "task_states"
    min_healthy_time = "30s"
  }

  group "frontend-agent" {
    count = 1
    
    network {
      port "http" {
        static       = 3000
        to           = 3000
        host_network = "private"
        }
      }
    
    service {
      name = "frontend-agent"
      tags = ["apps", "logs.promtail", "agent"]
      port     = "http"
      check {
        name     = "api-health"
        type     = "tcp"
        port     = "http"
        interval = "15s"
        timeout  = "5s"
        }
      }   

    constraint {
      attribute = "${attr.unique.hostname}"
#      attribute	= "${meta.duty}"
#      operator	= "set_contains_any"
#      value	= "glynac2worker"
      value     = "Worker-02" 
    }

    task "rag-agent" {
      driver = "docker"

      config {
        
        image = "65123/frontend:IMAGE_TAG_PLACEHOLDER"
        ports = ["http"]
        dns_servers = ["172.18.0.1", "172.17.0.1", "8.8.8.8", "8.8.4.4"]
      }


      template {
  data = <<EOF
{{ with nomadVar "nomad/jobs/Frontend-Glynac-Agent" }}
NEXT_PUBLIC_WS_URL= {{ .NEXT_PUBLIC_WS_URL }}
{{ end }}
		EOF
        destination = "secrets/.env"
        env = true
      }

      resources {
        cpu = 200
        memory = 200
        } 

    }
    
  }
}