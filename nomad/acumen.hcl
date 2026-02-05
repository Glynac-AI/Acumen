job "Acumen-Web" {
  datacenters = ["glynac-dc"] #disesuaikan
  type = "service"
  namsespace = "platform"

  update {
    max_parallel     = 1
    health_check     = "task_states"
    min_healthy_time = "30s"
  }

  group "acumen-web" {
    count = 1
    
    network {
      port "http" {
        static       = 3000
        to           = 3000
        host_network = "private"
        }
      }
    
    service {
      name = "acumen-web"
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
#      attribute = "${attr.unique.hostname}"
      attribute	= "${meta.duty}"
      operator	= "set_contains_any"
      value	= "glynac-worker"
#      value     = "Worker-02" 
    }

    task "acumen-web" {
      driver = "docker"

      config {
          image = "harbor-registry.service.consul:8085/glynac-fe/acumen:IMAGE_TAG_PLACEHOLDER"
          dns_servers = ["172.17.0.1", "8.8.8.8", "8.8.4.4"]
          auth {
        	  username = "admin"
        	  password = "GlynacP455"
        	  server_address = "harbor-registry.service.consul:8085"
      	  } 
        }

      resources {
        cpu = 200
        memory = 200
        } 

    }
    
  }
}
