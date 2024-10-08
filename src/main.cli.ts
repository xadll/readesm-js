

import * as fs from 'fs';
require('app-module-path').addPath(__dirname);

import EsmFile from 'EsmFile';
import HtmlReporter from 'Reporter/HtmlReporter';
import JsonReporter from 'Reporter/JsonReporter';
import FileUtil from 'utils/FileUtil';
import LastCardDownload from 'CardBlocks/LastCardDownload';
import BlockParseError from 'DataTypes/BlockParseError';


function main() {
    let args = process.argv.slice(2);
    let cmd = args.length > 0 ? args[0] : 'convert';

    if (cmd == 'analyze') {
        handleAnalyze();
    } else if (cmd == 'convert') {
        let err = handleConvert(args.slice(1));
        if (err) {
            console.log("Failed");
            process.exit(1);
        }
    } else {
        console.error("Unknown arguments: " + args.join(' '));
        process.exit(1);
    }
    console.log("Done");
}

function handleAnalyze() {
    fs.readdirSync('htmlpage/card_data').forEach(filename => {
        if (filename.match(/.*\.DDD$/i)) {
            console.log("Parsing " + filename);
            let data = FileUtil.readFileData('htmlpage/card_data/' + filename);
            let ef = EsmFile.parseData(data);

            let lcd = EsmFile.findTypeInVector<LastCardDownload>(LastCardDownload, ef.blocks);
            if (lcd) {
                console.log("Found LastCardDownload in " + filename);
            }
        }
    });
}

function handleConvert(args: string[]) {
    let inputfile = args.length > 0 ? args[0] : 'files/Input.ddd';
    let ef = convertFile(inputfile);
    return EsmFile.findTypeInVector<BlockParseError>(BlockParseError, ef.blocks);
}

function convertFile(inputfile: string) {
    let data = FileUtil.readFileData(inputfile);
    let ef = EsmFile.parseData(data);

    convertFileToHtml(ef, inputfile + '.html');
    convertFileToJson(ef, inputfile + '.json');

    return ef;
}

function convertFileToHtml(ef: EsmFile, outfile: string) {
    let report = new HtmlReporter();
    ef.printOn(report);

    let html = report.renderReport();
    FileUtil.writeFile(outfile, html);
    console.log(`Converted into HTML in ${outfile}`);
}

function convertFileToJson(ef: EsmFile, outfile: string) {
    let report = new JsonReporter();
    ef.printOn(report);

    let j = report.renderReport();
    FileUtil.writeFile(outfile, j);
    console.log(`Converted into JSON in ${outfile}`);
}

if (typeof require !== 'undefined' && require.main === module) {
    main();
}


