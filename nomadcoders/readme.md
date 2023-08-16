# TypeScript

#### 타입스크립트로 블록체인 만들기

<!-- 2023/08/11 ~ -->

#### 구현하는 기능
- Types
- Interfaces
- Classes
- Polymorphism
- Generics
- Call Signatures
- JSDoc

#### 패키지
- "Typescript"
- "TSConfig"
- "TSNode"

#### TypeScript란?

TypeScript는 Microsoft에서 개발한 오픈 소스 프로그래밍 언어로, JavaScript의 확장된 버전입니다. TypeScript는 정적 타입 체크를 포함한 강력한 타입 시스템을 제공하여 개발자가 더 안정적이고 확장 가능한 소프트웨어를 만들 수 있도록 도와줍니다. JavaScript는 동적 타입 언어로, 실행 중에 타입 오류를 발견하기 어려울 수 있지만, TypeScript는 개발 시간에 이러한 오류를 사전에 감지할 수 있도록 해줍니다.

#### 정리
1. TypeScript는 JavaScript에 추가적인 구문을 추가하여 editor와의 단단한 통합을 지원합니다. editor에서 초기에 오류를 잡을 수 있습니다.

2. TypeScript 코드는 JavaScript가 실행되는 모든 곳(브라우저, Node.js 또는 Deno 및 앱 등)에서 JavaScript로 변환될 수 있습니다. (컴파일 시 javascript로 변환)

3. TypeScript는 JavaScript를 이해하고 타입 추론(type inference)을 사용하여 추가 코드 없이도 훌륭한 도구를 제공합니다.

#### 사용 예시

- Javascript

    ![capture4](https://github.com/1GYOU1/kirbyTodoList/assets/90018379/803ab33c-862c-457d-93ba-210e6514ebf1)

- TypeScript

    ![capture2](https://github.com/1GYOU1/kirbyTodoList/assets/90018379/dcd5203f-7e77-46e0-9977-001000421730)

    ![capture3](https://github.com/1GYOU1/kirbyTodoList/assets/90018379/f6c1945b-9abf-46a2-a420-3c1e8fd21c35)

#### TypeScript 테스트 사이트

- https://www.typescriptlang.org/play

#### TypeScript 핸드북

- https://github.com/typescript-kr
- https://typescript-kr.github.io/pages/basic-types.html

<br>

## Chapter 2 - OVERVIEW OF TYPESCRIPT

변수 타입 명시

```ts
let a = "hello"// 명시하지 않아도 자동으로 추론해서 string타입이라고 인지
let a : string = "hello"// 타입 명시

let b = 8// 자동으로 추론해서 number형 인지
let b : number = 8// 타입 명시

let c = [1, 2, 3]// 자동 추론 number형 배열 인지
let c = number[] = []// 배열 타입 명시 string boolean 등 사용 가능.

let d : number[] = []// 배열 타입 명시. 아무것도 들어있지 않을 때 주로 사용.

let e = true;// 자동 추론 boolean형 인지
let e : boolean = true;// 타입 명시
```

object형 타입 명시

```ts
const playerGyou : {
    name : string,
    age? : number// ?는 age의 값이 number 또는 undefined
} = {
    name : "choco",
}

if(playerGyou.age && playerGyou.age < 10){
// age의 값이 undefined일 수도 있기 때문에 존재의 유무를 조건에 넣어줘야 오류가 안남.
}
```
여러개의 object 만들 때 Alias(별칭 타입)지정
```ts
type Age = number;
type Name = string;// 이렇게 지정할 수 있으나 과하게 사용은 X
type Player = {// 첫문자는 대문자로 선언 !
    name : Name,
    age? : Age
}

const gyou1 : Player = {
    name : "gyou1"
}
const gyou2 : Player = {
    name : "gyou2",
    age : 28
}
```
함수형 타입 명시
```ts
type Player = {
    name : string,
    age? : number
}
                    //인수의 타입 지정(argument)
function playerMaker(name : string) : Player {//함수 return값의 타입 지정
    return {
        name
    }
}

//화살표 함수 버전 문법 작성법
const playerMaker = (name : string) : Player => ({name})

const gyou1 = playerMaker("ggyou");
gyou1.age = 28
```
readonly : 값 고정. 변경하지 못하게 하는 설정. (불변성)
```ts
const numbers : readonly number[] = [1,2,3,4]
// numbers.push(1) readonly 속성 때문에 원본 값 변경 불가 !
```
Tuple : 배열 특정 위치에 특정 타입 지정.
```ts
const player : [string, number, boolean] = ["gyou", 28, true]
```

readonly + Tuple

```ts
const player : readonly [string, number, boolean] = ["gyou", 28, true]
// player[0] = "hi" readonly 속성 때문에 원본 값 변경 불가 !
```

any : typescript로 부터 빠져나오고 싶을 때 사용. js로 바꿔줌. 사용하지 않는 것을 권장.
```ts
const a : any[] = [1, 2, 3, 4]
const b : any = true

a + b//해당 부분을 가능하게 해줌... 좋은 방식 X
```

unknown : 변수 타입을 미리 알지 못 할 때 주로 사용. 어떤 작업을 하려면 이 변수의 타입을 먼저 확인해야 하는 방식. typescript가 타입 확인 작업을 강제로 시킴.
```ts
let a : unknown;
if(typeof a === "number){
    let b = a + 1
}
if(typeof a === "string"){
    let b = a.toUpperCase();
}

```

void : 아무것도 return하지 않는 함수를 대상으로 사용.
```ts
function hello(){//return 값이 없는 것을 자동으로 인식, void 안써줘도 됌.
    console.log("x")
}
```

never : 함수가 절대 return 하지 않을 때 쓰는 타입, 타입이 두가지 일 수도 있는 상황에 발생, 거의 사용 X.
```ts
function hello() : never {
    // return "xxx" 오류 발생
    throw new Error("XXX")//return하지 않고 오류를 발생
}

function hello2(name:string | number){
    if(typeof name === "string"){
        name// name : string
    }else if(typeof nems === "number"){
        name// name : number
    }else{
        name// name : never 실행되면 안되는 코드,,
    }
}
```

<br>

## Chapter 3 - FUNCTIONS

### call signature

```ts
const add = (a:number, b:number) => a+b
```
상단과 같은 코드
```ts
type Add = (a:number, b:number) => number;//call signature

const add:Add = (a, b) => a + b
```
1. 화살표 함수에서 {}를 생략하면 return이 생략된 것
2. 즉 a + b 와 { return a+b } 는 같은 뜻
3. {a+b}라고 하면 아무것도 리턴하지 않기 때문에 에러남

### Overloading

Function(=Method) Overloading은 직접 작성하기보다 외부 라이브러리에 자주 보이는 형태로, 하나의 함수가 복수의 Call Signature를 가질 때 발생한다.(매개변수가 다르며 이름이 동일한 함수)

매개변수의 개수는 동일하지만, 타입이 다른 경우

```ts
type Add = {
(a: number, b: number): number,
(a: number, b: string): number
}

const add: Add = (a, b) => {
if (typeof b === "string") return a;
return a + b;
}
```
Next.js의 라우터 push가 두 가지 방법으로 페이지를 이동한다고 할 때,
패키지나 라이브러리는 아래와 같이 주로 Overloading으로 구성되어있다.
```ts
router.push("/home");

router.push({
path: "/home",
state: 1
});

type Config = {
path: string,
state: number
}

type Push = {
(config: Config): void,
(config: string): void
}

const push: Push = (config) => {
if (typeof config === "string") console.log(config);
else console.log(config.path);
}
```

매개변수의 개수는 다르지만, 타입은 동일한 경우

```ts
type Add2 = {
(a: number, b: number): number,
(a: number, b: number, c: number): number
}

const add2: Add2 = (a, b, c?: number) => {
if (c) return a + b + c;
return a + b;
}

add(1, 2)
add(1, 2, 3)
```

### Polymorphism
