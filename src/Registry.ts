export default abstract class Registry {
  abstract register(extension: () => any): void;

  abstract get(id: string): any | undefined;

  abstract keys(): string[];

  abstract filterKeys(predicate: (properties: any) => boolean): string[];
}
