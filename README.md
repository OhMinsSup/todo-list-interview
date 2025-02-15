# TODO List

TODO

## 로컬 개발 환경 설정

1. `yarn`을 통해 의존성을 설치합니다.

2. **cloudflare**의 **D1** 및 **KV**를 사용하기 위해 **wrangler**를 이용해서 설정합니다.

3. **.dev.vars.example** 을 **.dev.vars**로 복사하고 값을 입력합니다.

4. **.env.example** 을 **.env**로 복사하고 값을 입력합니다.

5. `yarn db:migrate:dev`를 통해서 생성된 마이그레이션 파일을 d1에 적용합니다.

6. `yarn dev`를 통해서 개발 서버를 실행합니다.

### wrangler 설정

cloudflare D1 및 KV를 사용하기 위해서 wrangler를 설정을 해야합니다.
이 때, wrangler를 사용하기 위해서는 cloudflare 계정이 필요합니다.

**로컬 환경에서는 해당 설정 안해도 괜찮습니다.**

- [Cloudflare D1 생성](https://developers.cloudflare.com/d1/get-started/#2-create-a-database)

- [Cloudflare KV 생성](https://developers.cloudflare.com/kv/get-started/#2-create-a-kv-namespace)

## Database 마이그레이션

1. `yarn db:generate`를 통해서 마이그레이션 파일을 생성합니다.
