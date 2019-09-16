// The configuration options passed when creating the wasm terminal

// A Custom command is a function that takes in a stdin string, and an array of argument strings,
// And returns an stdout string, or undefined.
export type CallbackCommand = (
  args: string[],
  stdin: string
) => Promise<string | undefined>;

interface WasmCommandJsonMap {
  [commandName: string]: string;
}

interface CallbackCommandJsonMap {
  [commandName: string]: CallbackCommand;
}

export default class TerminalConfig {
  wasmTransformerWasmUrl: string;
  processWorkerUrl?: string;
  callbackCommands?: CallbackCommandJsonMap;
  additionalWasmCommands?: WasmCommandJsonMap;

  constructor(config: any) {
    if (!config) {
      throw new Error("You must provide a config for the wasm terminal.");
    }

    if (!config.wasmTransformerWasmUrl) {
      throw new Error(
        "You must provide a wasmTransformerUrl for the wasm terminal config, to fetch the wasi transformer"
      );
    }

    if (!config.processWorkerUrl) {
      console.warn(
        "Note: It is HIGHLY reccomended you pass in the processWorkerUrl in the terminal config to create process workers. Without this, some wasi programs will not work."
      );
    }

    // Assign our values
    this.wasmTransformerWasmUrl = config.wasmTransformerWasmUrl;
    this.processWorkerUrl = config.processWorkerUrl;
    this.callbackCommands = config.callbackCommands;
    this.additionalWasmCommands = config.additionalWasmCommands;
  }
}