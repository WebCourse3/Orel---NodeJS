import { Levels } from './Enums';
import * as fs from "fs";

export class Configuration {

	// Data Members
	private _console: boolean;
	private _file: boolean;
	private _colors: boolean;
	private _logLevel?: Levels;

	// Ctors
	constructor(console: boolean, file: boolean, colors: boolean, logLevel?: Levels){
		this.setConsole = console;
		this.setFile = file;
		this.setColors = colors;
		this.setLogLevel = logLevel;
	}

	configurationByFile(fsFile: string): boolean{

		var returnValue = false;

		if (fs.existsSync(fsFile)) {
			let configurationJson: string = fs.readFileSync(fsFile, "utf8");
			let newConfiguration = JSON.parse(configurationJson);

			this.setConsole = newConfiguration.console;
			this.setLogLevel = this.getLogLevelByName(newConfiguration.logLevel);
			this.setColors = newConfiguration.color;
			this.setFile = newConfiguration.file;

			returnValue = true;
		}

		return (returnValue);
	}

	getLogLevelByName(name: string): Levels{

		var logLevel: Levels;

		switch(name) {
			case 'info':
				logLevel = Levels.info;
				break;

			case 'debug':
				logLevel = Levels.debug;
				break;

			case 'warning':
				logLevel = Levels.warning;
				break;

			case 'error':
				logLevel = Levels.error;
				break;
		}

		return (logLevel);
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