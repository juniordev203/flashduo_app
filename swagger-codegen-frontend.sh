swagger-codegen generate -i http://localhost:5286/swagger/v1/swagger.json -l typescript-axios -o ./auto_api

"server": {
  "url": "http://localhost:3000",
  "cleartext": true
},

# Khi muốn sửa Url để chạy được trên máy thật:
# Chạy lệnh run server: dotnet run --urls "http://172.16.32.184:5286"
# Sửa lại file .env:  VITE_API_URL=http://172.16.32.184:5286
# Chạy build: yarn mobile + yarn dev
#