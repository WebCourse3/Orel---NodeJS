import { Levels } from './Enums';

export class Configuration {

	// Data Members
	private _console: boolean;
	private _file: boolean;
	private _colors: boolean;
	private _logLevel: Levels;

	// Ctors
	constructor(console: boolean, file: boolean, colors: boolean, logLevel?: Levels){
		this.setConsole = console;
		this.setFile = file;
		this.setColors = colors;
		this.setLogLevel = logLevel;
	}

	// Getters
	get getConsole(): boolean {
		return this._console;
	}

	get getFile(): boolean {
		return this._file;
	}

	get getColors(): boolean {
		return this._colors;
	}

	get getLogLevel(): Levels {
		return this._logLevel;
	}

	// Setters
	set setConsole(value: boolean) {
		this._console = value;
	}

	set setFile(value: boolean) {
		this._file = value;
	}

	set setColors(value: boolean) {
		this._colors = value;
	}

	set setLogLevel(value: Levels) {
		this._logLevel = value;
	}
}