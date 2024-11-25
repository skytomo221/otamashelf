type Callback = (...props: any[]) => Promise<any>;
const SAFETY_LEVELS = ['read', 'write', 'load', 'dengerous'] as const;
// read: 辞書アプリ内のデータを読み取るだけのコマンド
// write: 辞書アプリ内のデータを書き換えるコマンド
// load: ファイルシステムからデータを読み込むコマンド
// dengerous: ファイルシステムにデータを書き込むコマンド
export type SafetyLevel = (typeof SAFETY_LEVELS)[number];
type Value = { callback: Callback; safetyLevel: SafetyLevel };
export default class CommandsRegistry {
  protected readonly commands: Map<string, Value> = new Map();

  public registerCommand(
    command: string,
    callback: Callback,
    safetyLevel: SafetyLevel = 'dengerous',
  ) {
    this.commands.set(command, { callback, safetyLevel });
  }

  public async executeCommand(command: string, ...props: any[]) {
    const value = this.commands.get(command);
    if (!value) throw TypeError("Command doesn't exist");
    const { callback } = value;
    return await callback(...props);
  }

  public async executeCommandSafely(
    safetyLevel: SafetyLevel,
    command: string,
    ...props: any[]
  ) {
    const value = this.commands.get(command);
    if (!value) throw TypeError("Command doesn't exist");
    const { callback, safetyLevel: commandSafetyLevel } = value;
    if (
      SAFETY_LEVELS.indexOf(commandSafetyLevel) <
      SAFETY_LEVELS.indexOf(safetyLevel)
    ) {
      throw new Error(`Command ${command} is too dangerous to execute`);
    }
    return await callback(...props);
  }

  public getCommands() {
    return this.commands.keys();
  }
}
