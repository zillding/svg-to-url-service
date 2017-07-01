# svg-to-url-service

[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

A micro service to convert svg string to data url

## Usage

```sh
curl -X "POST" "http://service.end.point" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d $'{
  "data": "<svg>...</svg>",
  "svgoConfig": {/* custom svgo config */}
}'
```
