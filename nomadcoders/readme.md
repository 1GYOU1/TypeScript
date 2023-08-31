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

poly : many, several, much, multi
polyfon : 다각형
morphos, morphic : form(형태), structure(구조)

= 여러가지 다른 구조들


call signature을 작성할 때, 들어올 확실한 타입을 모를때 사용. call signature을 생성해주는 도구

generic 사용 전
```ts
type SuperPrint = {//들어올 모든 경우의 수만큼 타입을 넣기엔 너무 복잡...
    (arr: number[]):void
    (arr: boolean[]):void
    (arr: string[]):void
    (arr: (number|boolean[]):void
}

const superPrint: SuperPrint = (arr) => {
    arr.forEach(i => console.log(i))
}

superPrint([1, 2, 3, 4])
superPrint([true, false, true, true])
superPrint(["a", "b", "c", "d"])
// superPrint([1, 2, true, false, "hello"])
```

generic 사용 후

- any는 any(모든 것)라서 사용 자제, generic 사용할 것 권장
```ts
type SuperPrint = {
    <TypePlaceholder>(arr: TypePlaceholder[]):void // call signature 타입 자동 유추 
}

const superPrint: SuperPrint = (arr) => {
    arr.forEach(i => console.log(i))
}

superPrint([1, 2, 3, 4])
superPrint([true, false, true, true])
superPrint(["a", "b", "c", "d"])
superPrint([1, 2, true, false, "hello"])
```
```ts
type SuperPrint = {
    <T>(arr: T[]): T // call signature 타입 자동 유추 
}

const superPrint: SuperPrint = (arr) => arr[0]

const a = superPrint([1, 2, 3, 4])
const b = superPrint([true, false, true, true])
const c = superPrint(["a", "b", "c", "d"])
const d = superPrint([1, 2, true, false, "hello"])
//만약 any를 사용하게되면 d.toUpperCase()를 하면 에러가 나야하는데 (배열의 첫번째 요소를 리턴해주는데 숫자라서) any면 에러가 안남...
```
```ts
type SuperPrint = {
    //대문자 사용
    <T,M>(arr: T[], b:M): T // call signature 타입 자동 유추 
}

const superPrint: SuperPrint = (arr) => arr[0]

const a = superPrint([1, 2, 3, 4], "x")
const b = superPrint([true, false, true, true], 1)
const c = superPrint(["a", "b", "c", "d"], false)
const d = superPrint([1, 2, true, false, "hello"], [])
```

### Conclusions

generic 여러가지 사용법
```ts
function superPrint<T>(a: T[]){
    return a[0]
}

const a = superPrint<number>([1, 2, 3, 4])//명시안해줘도 자동으로 들어와서 지워도 똑같음.
const b = superPrint([true, false, true])
const c = superPrint(["a", "b", "c"])
const d = superPrint([1, 2, true, false, "hello"])
```

generic 타입 생성, 확장, 재사용
```ts
type Player<E> = {
    name: string
    extraInfo: E
}

type gyouExtra = {
    favFood: string
}
type gyouPlayer = Player<gyouExtra>

const gyou1: gyouPlayer = {
    name : "1gyou1",
    extraInfo: {
        favFood: "tteokbokki"
    }
}
const gyou2: Player<null> = {
    name: "1gyou2",
    extraInfo: null
}
```

```ts
type A = Array<number>

let a:A = [1, 2, 3, 4]
```

```ts
function printAllNumbers(arr: Array<number>){
//숫자 배열이 들어온다 가정할 때 (arr: number[])를 다르게 쓰는 법
}
```

React.js에서 generic 사용
```ts
useState<number>()
```

<br>

## Chapter 4 - CLASSES AND INTERFACES

### Classes

접근 가능한 위치

- private : 선언한 클래스 내 ⭕, 선언한 클래스 내 ❌,　인스턴스 ❌
- protected : 선언한 클래스 내 ⭕, 선언한 클래스 내 ⭕,　인스턴스 ❌
- public　: 선언한 클래스 내 ⭕, 선언한 클래스 내 ⭕,　인스턴스 ⭕

Ts ver.
```ts
class Player {
    constructor(
        private firstName: string,
        private lastName: string,
        public nickname: string
    ) {}
}
const gyou = new Player("first", "last", "1gyou1");
// gyou.firstName
// private이기 때문에 에러남.
```

Js ver.
```js
class Player { 
    constructor(firstName, lastName){
        this.firstName = firstName;
        this.lastName = lastName;
        this.nickname = nickname;
    }
}
const gyou = new Player("first", "last", "1gyou1");
gyou.firstName
```

추상클래스
- 다른 클래스가 상속받을 수 있는 클래스.
- 상속받을 수만 있고, 직접적으로 인스턴스를 만들지는 못함.
```ts
abstract class User {
    constructor(
        private firstName: string,
        private lastName: string,
        public nickname: string 
    ) {}
}
class Player extends User {//Player가 User을 상속
}
/* 
    const gyou = new User("first", "last", "1gyou1");
    이렇게 사용 불가능. 에러.
*/
const gyou = new Player("first", "last", "1gyou1");
```
추상클래스 안의 abstract method(추상 메소드)
```ts
abstract class User {//추상클래스
    constructor(
        private firstName: string,
        private lastName: string,
        public nickname: string 
    ) {}
    private getFullName(){//추상메소드
        return `${this.firstName} ${this.lastName}`
    }
}
class Player extends User {//Player가 User을 상속
}
const gyou = new Player("first", "last", "1gyou1");
// gyou.getFullName()
// private이기 때문에 에러남.
```

### Recap

미니 사전
```ts
type Words = {//property의 이름은 모르지만, 타입만 알 때 유용
    [key: number]: string
}

class Dict{
    private words: Workds//property 만들고
    constructor(){
        this.words = {}//초기화
    }
    add(word: Word){// word는 Word 클래스의 인스턴스 타입.
        if(this.word[word.term] === undefined){
            this.words[word.term] = word.def;
        }
    }
    def(term:string){
        return this.words[term]
    }
}

class Word{
    constructor{
        public term: string,
        public def: string
    }{}
}

const kimchi = new Word("kimchi", "한국의 음식");
const dict = new Dict()

dict.add(kimchi)
dict.def("kimchi")//'한국의 음식'
```

readonly
- 다른 누군가가 데이터 덮어쓰는 걸 방지
- public(값을 보여줄 수 있지만)을 수정할 수 없도록 만들 수 있음.

static
- 자바스크립트로 출력

```ts
type Words = {//property의 이름은 모르지만, 타입만 알 때 유용
    [key: number]: string
}

class Dict{
    private words: Workds//property 만들고
    constructor(){
        this.words = {}//초기화
    }
    add(word: Word){// word는 Word 클래스의 인스턴스 타입.
        if(this.word[word.term] === undefined){
            this.words[word.term] = word.def;
        }
    }
    def(term:string){
        return this.words[term]
    }
    static hello(){//자바스크립트로 출력
        return "hello"
    }
}

class Word{
    constructor{
        public readonly term: string,//readonly - 값은 보이지만 수정은 X
        public readonly def: string
    }{}
}

const kimchi = new Word("kimchi", "한국의 음식");

kimchi.def = "xxx"//이런 방식으로 내용을 수정하려고 하면 오류. 작동 X
Dict.hello()//static메소드 사용하여 자바스크립트로 작동 가능.
```
<br>

### Interfaces

타입을 사용하는 여러가지 방법 
```ts
type Nickname = string
type Health = number
type Friends = Array<string>

type Player = {// 타입스크립트에게 object의 모양을 알려줌.
    nickname: string,
    healthBar: number
}
const gyou1 : Player = {
    nickname: "1gyou1",
    healthBar: 10
}

type Food: string;
const kimchi: Food = "delicious"
```

타입을 지정된 옵션으로만 제한하기
```ts
type Team = "read" | "blue" | "yellow"
type Health = 1 | 5 | 10

/*
    type -> interface라고 바꿔도 지장 X
    object의 모양을 결정하는 방법
    1. type -> 좀 더 활용할 수 있는 게 많음(오브젝트 모양 결정, 타입 alias를 만들 수 있음 등...)
    2. interface -> 오로지 오브젝트의 모양을 타입스크립트에게 설명해 주기 위한 키워드. 클래스와 닮아있음.
*/
interface Player = {
    nickname: string,
    team: Team,
    health: Health
}

const gyou1: Player = {
    nickname: "ggyou",
    team: "yellow",//"pink"로 쓰면 오류남. 특정값이 지정되어있기 때문.
    health: 10
}
```

interface User 만들기 (type 버전 하단 코드와 같음)
```ts
interface User{
    name: string
}

// interface Player{
//     name: string //쓰기 귀찮으면 상속받아 사용할 수 있음.
// }

interface Player extends User{
}

const gyou1: Player = {
    name: "ggyou"
}
```
tyoe User 만들기 (interface 버전 상단과 같음)
```ts
type User = {
    name: string
}

type Player = User & {//&는 and를 의미

}

const gyou1: Player = {
    name: "ggyou"
}
```

interface의 특징 - property를 축적시킬 수 있음 (type은 불가함.)
```ts
interface User{
    name: string
}
interface: User{
    lastName: string
}
interface: User{
    health: number
}
//각각 인터페이스를 만들기만하면, 타입스크립트가 알아서 하나로 합쳐줌.
const gyou1: User = {
    name:"1gyou1",
    lastName: "1",
    health: 10
}
```
<br>

### Interfaces part Two

추상클래스와 인터페이스의 차이

1. 추상클래스(abstract class) ver.
- 추상클래스는 인스턴스 생성 허용 X (new User() ~~ 만들 수 없음.)
- 자바스크립트에서는 추상클래스(abstract)의 개념이 없기 때문에, 일반 클래스로 바뀌어서 인식됌.
- 다른 클래스들이 정해진 양식. 즉, 정해진 property와 메소드를 갖도록 해주는 양식이 정해져있는 형태를 만들기 위해 추상클래스를 사용함. 
```ts
abstract class User{
    constructor(
        protected firstName: string,
        protected lastName: string
    ){}
    //무엇을 구현해야하는지 !
    abstract sayHi(name: string): string
    abstract fullName(): string
}

class Player extends User{
    fullNmae(){
        return `${this.firstName} ${this.lastName}`
    }
    sayHi(name: string){
        return `Hello ${name}. My name is ${this.fullName()}`
    }
}
```
2. 인터페이스(interface) ver.
- 인터페이스는 컴파일하면 JS로 바뀌지 않고 사라짐.
- 인터페이스를 상속할 때는 property를 private로 만들지 못함. public만 가능.
- 인터페이스도 타입으로 지정할 수 있음.

클래스가 아니지만 클래스의 모양을 특정할 수 있게 해주는 방법
```ts
interface User{
    firstName: string,
    lastName: string,
    sayHi(name: string):string
    fullName(): string
}
interface Human{// 추가된 부분
    health: number
}
class Player implements User{
    constructor(
        public firstName: string,
        public lastName: string,
        public health: number
    ){}
    fullName(){
        return `${this.firstName} ${this.lastName}`
    }
    sayhi(name: string){
         return `Hello ${name}. My name is ${this.fullName()}`
    }
}

//인터페이스 타입 사용해보기
const makeUser(user: User): USer{
    new User{
        firstName: "gyou1",
        lastName: "1",
        fullName: () => "XX",
        sayHi: (name) => "string"
    }
}
```

### interface 정리

- 공식문서에 따르면 대부분의 경우에는 타입과 인터페이스가 매우 유사함.
- 인터페이스의 대부분의 기능은 타입에도 있다고 함.
- 타입스크립트에게 오브젝트의 모양을 설명한다는 같은 목적을 이루고 있음.

가장 큰 차이점
- 상속 
    - 인터페이스 extends로 상속
    - 타입은 연산자로 상속
- 기존에 존재하는 인터페이스에 새로운 필드 추가하는 방법
    - 인터페이스 : 같은 인터페이스 여러번 작성 가능
    - 타입 : 같은 타입 여러번 작성 불가능
    - 타입은 새 property를 추가하기 위해 다시 선언될 수 없지만 인터페이스는 항상 상속이 가능.

```ts
type PlayerA = {
    name: string
}
type PlayerAA = PlayerA & {
    lastName: string
}
const playerA: PlayerAA ={
    name: "gyou1",
    lastName: "1"
}
/////
interface PlayerB {
    name: string
}
interface PlayerB{
    lastName: string
}
interface PlayerB{
    health: number
}
interface playerB: PlayerB = {
    name: "gyou1",
    lastName: "1",
    health: number
}
```
```ts
type PlayerA= {
    firstNmae: string
}
interface PlayerB{
    firstName: string
}
class User implements PlayerB{
    constructor(
        public firstName: string
    ){}
}
```

### Polymorphism

```ts
interface Mystorage<T>{
    [key:string] : T
}

class LoclaStorage<T>{
    private storage: Mystorage<T> = {}
    set(key:string, value:T){
        this.storage[key] = value;
    }
    remove(key:string){
        delete this.storage[key]
    }
    get(key:string):T{
        return this.storage[key]
    }
    clear(){
        this.storage = {}
    }
}

const stringStorage = new LocalStorage<string>()
stringStorage.get("kkk")
stringStorage.set("hello", "how are you")

const booleanStorage = new Localstorage<boolean>();
booleanStorage.get("xxx")
booleanStorage.set("xxx", true)

```

<br>

## Chapter 5 - CTYPESCRIPT BLOCKCHAIN

블록체인의 PoC(개념증명)를 객체 지향 프로그래밍을 활용하는 타입스크립트

### #5.1 Targets
타입스크립트 프로젝트 생성

[파일 미리보기](https://github.com/1GYOU1/TypeScript/tree/main/nomadcoders/5.1-5.3)

① json 생성
>$ npm init -y

package.json
```json
{
  "name": "typescript",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",//-> 지우기
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"//-> 지우기
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

② devDependencies 설치
>$ npm install -D typescript

```json
{
  "name": "typescript",
  "version": "1.0.0",
  "description": "",
  "scripts": {},
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {// -> 이 부분이 새로 생김
    "typescript": "^5.2.2"
  }
}
```

③ src/index.ts - src 폴더에 index.ts 파일 생성. 해당 파일에 타입스크립트로 작업
```ts
const hihi = () => "hi";

class Block{
    constructor(private data: string){}
    static hello(){
        return "hi";
    }
}
```

④ tsconfig.json 자동완성기능 제공 파일 생성
```json
{
    "include": ["src"],//해당 배열에 자바스크립트로 컴파일하고 싶은 모든 디렉터리 작성.
    "compilerOptions": {
        "outDir": "build",//자바스크립트 파일이 생성될 디렉터리 지정
        "target": "ES5"//자바스크립트 버전 설정
    }
}
```
⑤ 컴파일 명령어 추가

package.json
```json
{
  "name": "typescript",
  "version": "1.0.0",
  "description": "",
  "scripts": {
    "build": "tsc"//-> 해당 부분 추가 작성
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "typescript": "^5.2.2"
  }
}
```

⑥ 새로 컴파일 해야할 때 마다 아래 명령어 입력.
>$ npm run build

/build/index.js 파일이 생성됨 -> src/index.ts 해당 파일이 자바스크립트로 컴파일된 결과물
```js
var hihi = function () { return "hi"; };
var Block = /** @class */ (function () {
    function Block(data) {
        this.data = data;
    }
    Block.hello = function () {
        return "hi";
    };
    return Block;
}());
```

### #5.2 Lib Configuration

**lib** 
- 런타임 환경 설정
- API와 타입을 알고있어서 자동완성 기능으로 마우스 올리면 미리 볼 수 있음.
- 예시 -> localStorage.getItem에 마우스를 올렸을 경우 localStorage.getItem(key:string): string

tsconfig.json
```json
{
    "include": ["src"],
    "compilerOptions": {
        "outDir": "build",
        "target": "ES6",
        "lib": ["ES6", "DOM"]//타입스크립트 코드가 어디서 동작할 것인지 정의
    }
}
```

### #5.3 Declaration Files
**d.ts** 파일
- API 정의 파일

① strict 모드

프로그램 정확성을 더 강력하게 보장하는 광범위한 타입 검사 동작을 가능하게 함.

tsconfig.ts
```json
{
    "include": ["src"],
    "compilerOptions": {
        "outDir": "build",
        "target": "ES6",
        "lib": ["ES6", "DOM"],
        "strict": true//-> 엄격한 타입 검사 옵션을 활성화
    }
}
```

② /src/myPackage.js 모듈 파일 생성
```js
export function init(config){
    return true;
}
export function exit(code){
    return code + 1;
}
```

③ index2.ts 생성

정의되지 않은 파일이라 에러 발생.
```ts
import { init, exit } from "myPackage";

init({
    url:"true"
})

exit(1)
```

④ myPackage.d.ts 정의 파일 생성.
```ts
interface Config{
    url: string;
}
declare module "myPackage"{
    function init(config: Config): boolean;
    function exit(code: number): number
}
```

### #5.4 JSDoc

[파일 미리보기](https://github.com/1GYOU1/TypeScript/tree/main/nomadcoders/5.4)

- 이미 작성되어있는 코드가 많을때, 주석(코멘트)영역에 작성하는 타입스크립트 보호장치 문법
- 자바스크립트 파일에 사용 가능.
- 함수 바로 위에 작성

① tsconfig.json 파일에 옵션 추가
```json
{
    "include": ["src"],
    "compilerOptions": {
        "outDir": "build",
        "target": "ES6",
        "lib": ["ES6", "DOM"],
        "strict": true,
        "allowJs": true //->옵션 추가
    }
}
```

② /src/myPackage.js 주석 안에 작성
```js
// @ts-check
/**
 * Initializes the project
 * @param {object} config
 * @param {boolean} config.debug
 * @param {string} config.url 
 * @returns {boolean}
 */
export function init(config){
    return true;
}

/**
 * Exits the program
 * @param {number} code 
 * @returns 
 */
export function exit(code){
    return code + 1;
}
```

③ src/index.ts 정상 적용되었는지 마우스 올려서 확인해보기.

### #5.5 Blocks
블록체인 구현
- 가상화폐의 기본적인 기능 몇 개만 구현하여 가상화폐가 어떻게 작동하는 지 알아보는 코스
- 블록체인이란 추가만 가능한 데이터베이스. 수정, 삭제 불가능.
- 블록체인은 '탈중앙화'가 가능. 즉, 특정 개인이 DB를 관리할 수 없으며, 모두 같은 복제본을 갖고 있음. 분산된 DB. 
- ex) 거래내역
- 해시 : 일방향 함수.
- 나의 데이터 + 이전 블록의 해시 = 나만의 해시
- 참고 영상 : https://youtu.be/Ca7Meu4z-F4?si=sFEv_vqV5zF5yn39

개발환경 세팅

① ts-node 설치
- 주로 개발 환경에서 사용.
- 빌드 없이 빠르게 새로고침 하고 싶을 때 사용.
- ts-node가 컴파일할 필요없이 타입스크립트 코드를 대신 실행해줌.
>$ npm i -D ts-node

② nodemon 설치
- nodemon을 설치하면 자동으로 커맨드를 재실행해줌.
- 일일히 서버를 재시작할 필요가 없음.
>$ npm i nodemon

package.json
```json
{
  "name": "typescript",
  "version": "1.0.0",
  "description": "",
  "scripts": {
    "build": "tsc",
    "dev": "nodemon --exec ts-node src/index.ts",//-> 추가
    "start": "node build/index.js"//-> 추가
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "typescript": "^5.2.2"
  }
}
```

③ npm run dev 실행, 프로젝트 시작. (저장과 동시에 자동으로 컴파일 됌.)
>$ npm run dev

---

<br>

index.ts
```ts

```
