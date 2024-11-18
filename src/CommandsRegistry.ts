type Callback = (...props: any[]) => any;
const SAFETY_LEVELS = ['read', 'load', 'dengerous'] as const;
type SafetyLevel = (typeof SAFETY_LEVELS)[number];
type Value = { callback: Callback; safetyLevel: SafetyLevel };
export default class CommandsRegistry {
  protected readonly commands: Map<string, Value> = new Map();

  public registerCommand(
    command: string,
    callback: Callback,
    safetyLevel: SafetyLevel = 'read',
  ) {
    this.commands.set(command, { callback, safetyLevel });
  }

  public executeCommand(command: string, ...props: any[]) {
    const value = this.commands.get(command);
    if (!value) return undefined;
    const { callback } = value;
    return callback(...props);
  }

  public executeCommandSafely(
    safetyLevel: SafetyLevel,
    command: string,
    ...props: any[]
  ) {
    const value = this.commands.get(command);
    if (!value) return undefined;
    const { callback, safetyLevel: commandSafetyLevel } = value;
    if (
      SAFETY_LEVELS.indexOf(commandSafetyLevel) <
      SAFETY_LEVELS.indexOf(safetyLevel)
    ) {
      throw new Error(`Command ${command} is too dangerous to execute`);
    }
    return callback(...props);
  }

  public getCommands() {
    return this.commands.keys();
  }
}
