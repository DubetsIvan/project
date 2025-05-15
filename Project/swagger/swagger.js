{
  "openapi": "3.0.0",
  "info": {
    "title": "Music Playlist API",
    "version": "1.0.0",
    "description": "API для створення, редагування та керування музичними плейлистами."
  },
  "paths": {
    "/api/users": {
      "post": {
        "summary": "Створити нового користувача",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/User"
              }
            }
          }
        },
        "responses": {
          "201": { "description": "Користувача створено" }
        }
      }
    },
    "/api/users/{id}": {
      "delete": {
        "summary": "Видалити користувача та його плейлисти",
        "parameters": [
          { "name": "id", "in": "path", "required": true, "schema": { "type": "string" } }
        ],
        "responses": {
          "200": { "description": "Користувача видалено" }
        }
      }
    },
    "/api/playlists": {
      "post": {
        "summary": "Створити плейлист",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/Playlist"
              }
            }
          }
        },
        "responses": {
          "201": { "description": "Плейлист створено" }
        }
      }
    },
    "/api/playlists/{id}": {
      "delete": {
        "summary": "Видалити плейлист",
        "parameters": [
          { "name": "id", "in": "path", "required": true, "schema": { "type": "string" } }
        ],
        "responses": {
          "200": { "description": "Плейлист видалено" }
        }
      },
      "put": {
        "summary": "Змінити порядок треків",
        "parameters": [
          { "name": "id", "in": "path", "required": true, "schema": { "type": "string" } }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "trackIds": {
                    "type": "array",
                    "items": { "type": "string" }
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": { "description": "Порядок оновлено" }
        }
      }
    },
    "/api/playlists/{id}/tracks": {
      "post": {
        "summary": "Додати трек до плейлисту",
        "parameters": [
          { "name": "id", "in": "path", "required": true, "schema": { "type": "string" } }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "trackId": { "type": "string" }
                }
              }
            }
          }
        },
        "responses": {
          "200": { "description": "Трек додано" }
        }
      }
    },
    "/api/playlists/{playlistId}/tracks/{trackId}": {
      "delete": {
        "summary": "Видалити трек з плейлисту",
        "parameters": [
          { "name": "playlistId", "in": "path", "required": true, "schema": { "type": "string" } },
          { "name": "trackId", "in": "path", "required": true, "schema": { "type": "string" } }
        ],
        "responses": {
          "200": { "description": "Трек видалено" }
        }
      }
    },
    "/api/tracks": {
      "post": {
        "summary": "Створити трек",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": { "$ref": "#/components/schemas/Track" }
            }
          }
        },
        "responses": {
          "201": { "description": "Трек створено" }
        }
      }
    },
    "/api/tracks/search": {
      "get": {
        "summary": "Пошук треків за тегом та/або датою",
        "parameters": [
          { "name": "tag", "in": "query", "schema": { "type": "string" } },
          { "name": "date", "in": "query", "schema": { "type": "string", "format": "date" } }
        ],
        "responses": {
          "200": { "description": "Список знайдених треків" }
        }
      }
    }
  },
  "components": {
    "schemas": {
      "User": {
        "type": "object",
        "properties": {
          "username": { "type": "string" },
          "email": { "type": "string" }
        }
      },
      "Playlist": {
        "type": "object",
        "properties": {
          "name": { "type": "string" },
          "user": { "type": "string" },
          "tracks": {
            "type": "array",
            "items": { "type": "string" }
          }
        }
      },
      "Track": {
        "type": "object",
        "properties": {
          "name": { "type": "string" },
          "artist": { "type": "string" },
          "genre": { "type": "string" },
          "tags": {
            "type": "array",
            "items": { "type": "string" }
          }
        }
      }
    }
  }
}
