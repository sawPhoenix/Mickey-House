class Animal {
  constructor(public name: string) {}
  say() {
    console.log("");
  }
}
class Dog extends Animal {
  say() {
    console.log("汪汪汪");
  }
}

class Cat extends Animal {
  say() {
    console.log("喵喵喵");
  }
}

export class AnimalFactory {
  private constructor(name: string, params: any) {
    switch (name) {
      case "dog":
        return new Dog(params);
      case "cat":
        return new Cat(params);
      default:
        throw new Error("not found");
    }
  }
}
