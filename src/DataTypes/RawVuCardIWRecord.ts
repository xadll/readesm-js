// This file was AUTO-GENERATED.
// Make changes in the generator script generate.py,
// the data definitions in DataDefinitions.xml
// or derive a class


import * as padStart from 'lodash/padStart';
import Block from 'DataTypes/Block';
import Subblocks from 'DataTypes/Subblocks';
import RawData from 'DataTypes/RawData';
import DataType from 'DataTypes/DataType';
import DataReader from 'utils/DataReader';
import Converter from 'utils/Converter';
import QString from 'utils/QString';
import FormatStrings from 'utils/FormatStrings';
import CardBlock from 'CardBlocks/CardBlock';
import VuBlock from 'VuBlocks/VuBlock';
import Reporter from 'Reporter/Reporter';

import {tr} from 'utils/Translation';

import TimeReal from 'DataTypes/TimeReal';
import Name from 'DataTypes/Name';
import VehicleRegistration from 'DataTypes/VehicleRegistration';
import FullCardNumber from 'DataTypes/FullCardNumber';


export default class RawVuCardIWRecord extends DataType {

    static BLOCK_TYPE = 0;
    

    cardHolderName: Name;
    cardNumber: FullCardNumber;
    cardExpiryDate: TimeReal;
    cardInsertionTime: TimeReal;
    vehicleOdometerValueAtInsertion: number;
    cardSlotNumber: number;
    cardWithdrawalTime: TimeReal;
    vehicleOdometerValueAtWithdrawal: number;
    previousVehicleRegistration: VehicleRegistration;
    previousCardWithdrawalTime: TimeReal;
    manualInputFlag: number;
    static staticSize: number = 129;
    
    constructor(data: ArrayBuffer) {
        super(data);

        this.cardHolderName = new Name(data.slice(0));
        this.cardNumber = new FullCardNumber(data.slice(72));
        this.cardExpiryDate = new TimeReal(data.slice(90));
        this.cardInsertionTime = new TimeReal(data.slice(94));
        this.vehicleOdometerValueAtInsertion = DataReader.readUint24(data, 98);
        this.cardSlotNumber = DataReader.readUint8(data, 101);
        this.cardWithdrawalTime = new TimeReal(data.slice(102));
        this.vehicleOdometerValueAtWithdrawal = DataReader.readUint24(data, 106);
        this.previousVehicleRegistration = new VehicleRegistration(data.slice(109));
        this.previousCardWithdrawalTime = new TimeReal(data.slice(124));
        this.manualInputFlag = DataReader.readUint8(data, 128);    
    }

    className() {
        return "RawVuCardIWRecord";
    }

    title() {
        return "";
    }

    size() {
        return 129;
    }

    toString() {
		let qs = new QString('VuCardIWRecord');
        return qs.toString();
    }

    printOn(report: Reporter) {

        report.writeBlock(this.cardHolderName, tr("cardHolderName"));
        report.writeBlock(this.cardNumber, tr("cardNumber"));
        report.tagValuePair(tr("cardExpiryDate"), this.cardExpiryDate.toString());
        report.tagValuePair(tr("cardInsertionTime"), this.cardInsertionTime.toString());
        report.tagValuePair(tr("vehicleOdometerValueAtInsertion"), new QString("%1 km").arg(this.vehicleOdometerValueAtInsertion).toString());
        report.tagValuePair(tr("cardSlotNumber"), this.cardSlotNumber);
        report.tagValuePair(tr("cardWithdrawalTime"), this.cardWithdrawalTime.toString());
        report.tagValuePair(tr("vehicleOdometerValueAtWithdrawal"), new QString("%1 km").arg(this.vehicleOdometerValueAtWithdrawal).toString());
        report.writeBlock(this.previousVehicleRegistration, tr("previousVehicleRegistration"));
        report.tagValuePair(tr("previousCardWithdrawalTime"), this.previousCardWithdrawalTime.toString());
        report.tagValuePair(tr("manualInputFlag"), this.manualInputFlag);
    }
}

