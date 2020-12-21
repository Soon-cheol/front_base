# 1. Class

ES6에는 class 키워드가 추가되어 ES5의 prototype 기반 상속보다 명확하게 class를 정의할 수 있다.

get 과 set 키워드 외에도 static 키워드를 사용해 static 메소드를 정의하는 것도 가능하다.

```js
class baseModel {
  constructor(options = {}, data = []) {
    // class constructor
    this.name = "Base";
    this.url = "http://azat.co/api";
    this.data = data;
    this.options = options;
  }

  getName() {
    // class method
    console.log(`Class name: ${this.name}`);
  }
}
```

constructor 는 class 내부에 하나만 존재할 수 있으며 메소드 정의에 function 또는 콜론(":")이 더이상 필요하지 않다.

단, property의 경우 메소드와 달리 생성자에서 값을 할당해야 한다.

또한 아래의 예시와 같이 class NAME extends PARENT_NAME 형식으로 상속이 가능하다.

상속시 부모 생성자를 호출하기 위해 super() 를 사용할 수 있다.

생성자가 아닌 메소드에서는 super 키워드를 사용해서 부모 메소드에 접근한다.

```js
class AccountModel extends baseModel {
  constructor(options, data) {
    super({ private: true }, ["32113123123", "524214691"]); //call the parent method with super
    this.name = "Account Model";
    this.url += "/accounts/";
  }

  get accountsData() {
    //calculated attribute getter
    // ... make XHR
    return this.data;
  }
}
```

class 는 get 과 set 키워드를 사용할 수 있으며 선언된 함수는 아래와 같이 사용할 수 있다.

```js
let accounts = new AccountModel(5);
accounts.getName();
console.log("Data is %s", accounts.accountsData);
```
