'use strict';
console.log('Loading function');


exports.handler = (event, context, callback) => {
    let success = 0; // Number of valid entries found
    let failure = 0; // Number of invalid entries found

    /* Process the list of records and transform them */
    const output = event.records.map((record) => {
        // Kinesis data is base64 encoded so decode here
        console.log(record.recordId);
        const payload = (Buffer.from(record.data, 'base64')).toString('utf8');
        console.log('Decoded payload:', payload);

        // Split the data into it's fields so we can refer to them by index
        const match = JSON.parse(payload);
        console.log('match payload:', match);
        if (match) {
            /* Prepare JSON version from IoT data */
            const result1 = `${match["1S0Z7F92N86S68KI_1_AUXILIQUIDOPENING"]},${match["1S0Z7F92N86S68KI_1_COMPCURRENT"]},${match["1S0Z7F92N86S68KI_1_COMPEXHAUSTTEMP"]},${match["1S0Z7F92N86S68KI_1_COMPLOAD"]},${match["1S0Z7F92N86S68KI_1_COMPPOWER"]},${match["1S0Z7F92N86S68KI_1_COMPRUNTIME"]},${match["1S0Z7F92N86S68KI_1_COMPSPEED"]},${match["1S0Z7F92N86S68KI_1_COMPSUCTIONTEMP"]},${match["1S0Z7F92N86S68KI_1_COMPVOLTAGE"]},${match["1S0Z7F92N86S68KI_1_CONDSIDEEXHAUSTPRESS"]},${match["1S0Z7F92N86S68KI_1_DISCHARGESUPERHEAT"]},${match["1S0Z7F92N86S68KI_1_ECONPRESS"]},${match["1S0Z7F92N86S68KI_1_ECONREFRTEMP"]},${match["1S0Z7F92N86S68KI_1_EVAPSIDESUCTIONPRESS"]},${match["1S0Z7F92N86S68KI_1_INVERTERTEMP"]},${match["1S0Z7F92N86S68KI_1_MAINFLOWVALVEOPENING"]},${match["1S0Z7F92N86S68KI_1_MAINLOOPLEVEL"]},${match["1S0Z7F92N86S68KI_2_AUXILIQUIDOPENING"]},${match["1S0Z7F92N86S68KI_2_COMPCURRENT"]},${match["1S0Z7F92N86S68KI_2_COMPEXHAUSTTEMP"]},${match["1S0Z7F92N86S68KI_2_COMPLOAD"]},${match["1S0Z7F92N86S68KI_2_COMPPOWER"]},${match["1S0Z7F92N86S68KI_2_COMPRUNTIME"]},${match["1S0Z7F92N86S68KI_2_COMPSPEED"]},${match["1S0Z7F92N86S68KI_2_COMPSUCTIONTEMP"]},${match["1S0Z7F92N86S68KI_2_COMPVOLTAGE"]},${match["1S0Z7F92N86S68KI_2_CONDSIDEEXHAUSTPRESS"]},${match["1S0Z7F92N86S68KI_2_DISCHARGESUPERHEAT"]},${match["1S0Z7F92N86S68KI_2_ECONPRESS"]},${match["1S0Z7F92N86S68KI_2_ECONREFRTEMP"]},${match["1S0Z7F92N86S68KI_2_EVAPSIDESUCTIONPRESS"]},${match["1S0Z7F92N86S68KI_2_INVERTERTEMP"]},${match["1S0Z7F92N86S68KI_2_MAINFLOWVALVEOPENING"]},${match["1S0Z7F92N86S68KI_2_MAINLOOPLEVEL"]},${match["1S0Z7F92N86S68KI_3_AUXILIQUIDOPENING"]},${match["1S0Z7F92N86S68KI_3_COMPCURRENT"]},${match["1S0Z7F92N86S68KI_3_COMPEXHAUSTTEMP"]},${match["1S0Z7F92N86S68KI_3_COMPLOAD"]},${match["1S0Z7F92N86S68KI_3_COMPPOWER"]},${match["1S0Z7F92N86S68KI_3_COMPRUNTIME"]},${match["1S0Z7F92N86S68KI_3_COMPSPEED"]},${match["1S0Z7F92N86S68KI_3_COMPSUCTIONTEMP"]},${match["1S0Z7F92N86S68KI_3_COMPVOLTAGE"]},${match["1S0Z7F92N86S68KI_3_CONDSIDEEXHAUSTPRESS"]},${match["1S0Z7F92N86S68KI_3_DISCHARGESUPERHEAT"]},${match["1S0Z7F92N86S68KI_3_ECONPRESS"]},${match["1S0Z7F92N86S68KI_3_ECONREFRTEMP"]},${match["1S0Z7F92N86S68KI_3_EVAPSIDESUCTIONPRESS"]},${match["1S0Z7F92N86S68KI_3_INVERTERTEMP"]},${match["1S0Z7F92N86S68KI_3_MAINFLOWVALVEOPENING"]},${match["1S0Z7F92N86S68KI_3_MAINLOOPLEVEL"]},${match["SYSTEM_CONDCAPACITY"]},${match["SYSTEM_CONDSIDETEMPIN"]},${match["SYSTEM_CONDSIDETEMPOUT"]},${match["SYSTEM_EVAPCAPACITY"]},${match["SYSTEM_EVAPSIDETEMPOUT"]},${match["SYSTEM_UNITPOWER"]},${match["code"]},${match["time"]}` + "\n";
            console.log('result is :',result1);
            success++;
            return {
                recordId: record.recordId,
                result: 'Ok',
                data: (Buffer.from(result1, 'utf8')).toString('base64'),
            };
        } else {
            /* Failed event, notify the error and leave the record intact */
            failure++;
            return {
                recordId: record.recordId,
                result: 'ProcessingFailed',
                data: record.data,
            };
        }
    });
    console.log(`Processing completed.  Successful records ${success}, Failed records ${failure}.`);
    callback(null, { records: output });
};