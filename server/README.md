## Singleton
+ singleton을 말하는 instance는 service이다. service는 providers에서 주입되고 하나의 instance로 유지된다.  

+ 여기서 __providers는 module 단위로 관리를 해야 기대하는 singleton대로 동작한다.__  
예를 보자. PostModule에 StateService의 의존성 주입이 있다. 여기서 AppModule에서 PostModule을 import하고 __AppModule에도__ StateService를 주입한다면 StateService는 하나의 instance로 동작하지 않는다.  

<br/>

## Life cycle 

> Middleware -> Guard -> Interceptor -> Pipe -> Handler -> Interceptor -> Exception Filter 

구현하고자 하는 것이 어떤 cycle에서 다루기 알맞을지 생각해보자.

<br/>

## Custom Pipe
```typescript
import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class UploadPipe implements PipeTransform {
    private readonly logger = new Logger(UploadPipe.name);

    transform(value: UploadI, metadata: ArgumentMetadata) {
        ...
        // 몇개 들어왔냐
        // 적절한 확장자냐
        ...
        return value;
    }
}
```
PipeTransform을 구현해서 만들 수 있다.

### Pipe bind ( Pipe 사용 )

```typescript
  @Post("/upload")
  @UsePipes(new UploadPipe())
  @UseInterceptors(FileFieldsInterceptor([
    { name: "image", maxCount: 1 },
    { name: "md", maxCount: 1 }
  ]))
  async createFile(
    @UploadedFiles() files: UploadI,
    @Body() createFileDto: CreateFileDto
  ){
    ...
    ...
    return `success upload post`;
  }
```
+ nestjs/common의 UsePipes 를 사용하여 method level에서 bind한다.  
UsePipes를 사용하면 controller 전체에 적용되어 @UploadedFiles, @Body 둘 다에 적용된다. _docs에선 method level사용 이라 한다._

<br/>

```typescript
  @Post("/upload")
  @UseInterceptors(FileFieldsInterceptor([
    { name: "image", maxCount: 1 },
    { name: "md", maxCount: 1 }
  ]))
  async createFile(
    @UploadedFiles(new UploadPipe()) files: UploadI,
    @Body() createFileDto: CreateFileDto
  ){
    ...
    ...
    return `success upload post`;
  }
```
+ router handler에 bind한다.  
@UploadedFiles 에만 적용할 수 있다.

<br/>

```typescript
import { Module } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';

@Module({
  providers: [
    {
      provide: APP_PIPE,
      useClass: UploadPipe,
    },
  ],
})
```
+ 전역 컨트롤러에 bind한다.

<br/>

## Guard, middleware 차이
- 미들웨어는 next() 함수를 호출한 후 어떤 router 핸들러가 실행될 지 알 수 없다.
- **가드**는 ExecutionContext 인스턴스에 액세스할 수 있으므로 다음에 실행될 작업을 정확히 알 수 있다. request와 response의 정확한 지점에 구체적인 로직을 삽입한다.

<br/>

## Dynamic modules
- nest에는 host module과 consumer module이 존재한다. 정적 바인딩 모듈 방법으로는 host 모듈을 consumer 모듈에 따라 custom하게 구현할 수 없다. 
즉 consumer 모듈에 따라 host 모듈의 속성, 동작을 다르게 구현해야 할 때( import 할 때) dynamic module 방법이 사용된다.

### Dynamic module을 설계할 때 권장
- `register`, you are expecting to configure a dynamic module with a specific configuration for use only by the calling module. For example, with Nest's `@nestjs/axios`: `HttpModule.register({ baseUrl: 'someUrl' })`. If, in another module you use `HttpModule.register({ baseUrl: 'somewhere else' })`, it will have the different configuration. You can do this for as many modules as you want.
- `forRoot`, you are expecting to configure a dynamic module once and reuse that configuration in multiple places (though possibly unknowingly as it's abstracted away). This is why you have one `GraphQLModule.forRoot()`, one `TypeOrmModule.forRoot()`, etc.
- `forFeature`, you are expecting to use the configuration of a dynamic module's `forRoot` but need to modify some configuration specific to the calling module's needs (i.e. which repository this module should have access to, or the context that a logger should use.)

<br/>

## 의존성에 대해..
( A→C : A는 C에 의존성이 있다.) 
- A→B→C 라고 해서 A→C 라는 의존성이 성립되야 하는 건 아니잖아. 의존성은 모듈(개인) ←→ 모듈(개인) 관계 ( 해석에 따라 다르게 볼 수 있으나? nest에서는 그런 관계다. )

<br/>

## providers
### Asynchronous providers
```typescript
{
  provide: 'ASYNC_CONNECTION',
  useFactory: async () => {
    const connection = await createConnection(options);
    return connection;
  },
}
```
+ Nest will await resolution of the promise before instantiating any class that depends on (injects) such a provider.

### custom provider
```typescript
const connectionProvider = {
  provide: 'CONNECTION',
  useFactory: (optionsProvider: OptionsProvider, optionalProvider?: string) => {
    const options = optionsProvider.get();
    return new DatabaseConnection(options);
  },
  inject: [OptionsProvider, { token: 'SomeOptionalProvider', optional: true }],
  //       \_____________/            \__________________/
  //        This provider              The provider with this
  //        is mandatory.              token can resolve to `undefined`.
};

@Module({
  providers: [
    connectionProvider,
    OptionsProvider,
    // { provide: 'SomeOptionalProvider', useValue: 'anything' },
  ],
})
```
+ Factory providers
+ provider를 동적으로 만들 수 있다.