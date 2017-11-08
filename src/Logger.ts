import { Configuration } from './Configuration';
import { Levels, LevelsColor } from './Enums';
import * as fs from "fs";

export class Logger{

	// Data Members
	private _level: Levels;
	private _configuration: Configuration;
	private _name: string;

	// Getters and Setters
	get getLevel(): Levels {
		return this._level;
	}

	set setLevel(value: Levels) {
		this._level = value;
	}

	get getConfiguration(): Configuration {
		return this._configuration;
	}

	set setConfiguration(value: Configuration) {
		this._configuration = value;
	}

	get getName(): string {
		return this._name;
	}

	set setName(value: string) {
		this._name = value;
	}

	// Ctor
	constructor(name: string, configuration: Configuration){
		this.setName = name;
		this.setConfiguration = new Configuration(configuration.getConsole,
												  configuration.getFile,
												  configuration.getColors,
												  configuration.getLogLevel);
	}

	log(level: Levels, strings: string[]): void {

		let color = LevelsColor.White;
        let levelName = "";

        if (level){
	        level = this.getConfiguration.getLogLevel;
        }

		switch (level){

			case (Levels.info):
				levelName = "Info";
				color = LevelsColor.Green;
				break;

			case (Levels.debug):
				levelName = "Debug";
				color = LevelsColor.Blue;
				break;

			case (Levels.warning):
				levelName = "Warning";
				color = LevelsColor.Yellow;
				break;

			case (Levels.error):
				levelName = "Error";
				color = LevelsColor.Red;
				break;
		}

		if (this.getConfiguration.getConsole){

			strings.forEach( currString =>
			{
				if (this.getConfiguration.getColors) {
					console.log('\x1b[' + color + 'm%s\x1b[0m', currString);
				}
				else {
					console.log(currString);
				}
			});
		}

		// Print to file
		if (this.getConfiguration.getFile){

			strings.forEach( currString => {
				fs.appendFileSync(this.getName, levelName + ": " + currString + "\r\n");
			});
		}
	}

	info(strings: string[]): void{
		this.log(Levels.info, strings);
	}

	warning(strings: string[]): void{
		this.log(Levels.warning, strings);
	}

	debug(strings: string[]): void{
		this.log(Levels.debug, strings);
	}

	error(strings: string[]): void{
		this.log(Levels.error, strings);
	}

	configuration(configuration: Configuration): void{
		this.setConfiguration = new Configuration(configuration.getConsole, configuration.getFile, configuration.getColors, configuration.getLogLevel);
	}
}