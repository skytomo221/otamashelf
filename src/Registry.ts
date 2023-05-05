export default abstract class Registry {
  abstract register(extension: () => any): void;

  abstract get(id: string): any | undefined;

  abstract keys(): string[];
}
