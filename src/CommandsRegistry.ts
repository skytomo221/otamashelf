export default class CommandsRegistry {
  protected readonly commands: Map<string, (...props: any[]) => any> =
    new Map();

  public regesterCommand(command: string, callback: (...props: any[]) => any) {
    this.commands.set(command, callback);
  }

  public executeCommand(command: string, ...props: any[]) {
    const callback = this.commands.get(command);
    if (!callback) return undefined;
    return callback(...props);
  }

  public getCommands() {
    return this.commands.keys();
  }
}
