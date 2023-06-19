export type ContextTypes = boolean | number | string;

export default class ContextsRegistry {
  protected readonly contexts: Map<string, ContextTypes> = new Map();

  public regesterContext(action: string, value: ContextTypes) {
    this.contexts.set(action, value);
  }

  public get(action: string) {
    return this.contexts.get(action);
  }
}
