class Optional<T> {
  public static of<U>(value: U) : Optional<U>   {
    return new Optional<U>(false, value);
  }

  public static nullValue() {
    return new Optional( true);
  }

  private constructor(isNull: boolean, value?: T, ) {
    this.value = value;
    this.isNull = isNull;
  }

  readonly value?: T;
  readonly isNull: boolean;
}

export const getKeyValue = <T extends object, U extends keyof T>(obj: T) => (key: U) => obj[key];
