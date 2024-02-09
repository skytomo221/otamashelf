class NoValueError extends TypeError {
  key: string;
  constructorName: string;

  static {
    this.prototype.name = 'NoValueError';
  }

  constructor(key: any, map: Map<any, any>) {
    super(`No value for key ${key} in ${map.constructor.name}`);
    this.key = key;
    this.constructorName = map.constructor.name;
  }
}
