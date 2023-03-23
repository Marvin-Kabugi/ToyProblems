// this function returns the net salary of an income
function calculateNetPay(income){
    let paye = payeFunc(income, setValue);
    let nhif = nhifFunc(income);
    let nssf = nssfFunc(income, "new", newRate);
    let netPay = income - paye - nhif - nssf;
    
    return netPay;
}

// this function calculates the paye of a certain income per month
function payeFunc(income, cb){
    let taxPayable = 0;
    const personalReleif = 2400
    const insuranceReleif = 5000;
    const allowablePensionFund = 20000;
    const housingReleif = 9000;
    const ownerOccupier = 25000;
    const disabilityExemption = 150000;
    let isInsuranceReleif = cb(true);
    let isAllowablePensionFund = cb(true);
    let isHousingReleif = cb(true);
    let isOwnerOccupier = cb(true);
    let isDisabilityExcemption = cb(false);

    function ify(isBoolean, releif){
        if(isBoolean){
            return income -= releif
        }
        return income;
    }

    ify(isInsuranceReleif, insuranceReleif);
    ify(isAllowablePensionFund, allowablePensionFund);
    ify(isHousingReleif, housingReleif);
    ify(isOwnerOccupier, ownerOccupier);
    ify(isDisabilityExcemption, disabilityExemption);

    if (income <= 24000){
        taxPayable = income * 0.01
    }
    if (income >= 24000 && income <= 32333){
        taxPayable += ((income - 24000) * 0.25) + 240;
    }
    if (income > 32333){
        taxPayable += ((income - 32333) * 0.30) + 240 + (8333 * 0.25);
    }
    return Math.floor(taxPayable - personalReleif);
}


// this function calculates NHIF deductions to be made on a particular income
function nhifFunc(income){
    let deduction;
    switch (true) {
        case income < 5999:
            deduction = 150;
            break;
        case income >= 6000 && income <= 7999:
            deduction = 300;
            break;
        case income >= 8000 && income <= 11999:
            deduction = 400;
            break;
        case income >= 12000 && income <= 14999:
            deduction = 500;
            break;
        case income >= 15000 && income <= 19999:
            deduction = 600;
            break;
        case income >= 20000 && income <= 24999:
            deduction = 750;
            break;
        case income >= 25000 && income <= 29999:
            deduction = 850;
            break;
        case income >= 30000 && income <= 34999:
            deduction = 900;
            break;
        case income >= 35000 && income <= 39999:
            deduction = 950;
            break;
        case income >= 40000 && income <= 44999:
            deduction = 1000;
            break;
        case income >= 45000 && income <= 49999:
            deduction = 1100;
            break;
        case income >= 50000 && income <= 59999:
            deduction = 1200;
            break;
        case income >= 60000 && income <= 69999:
            deduction = 1300;
            break;
        case income >= 70000 && income <= 79999:
            deduction = 1400;
            break;
        case income >= 80000 && income <= 89999:
            deduction = 1500;
            break;
        case income >= 90000 && income <= 99999:
            deduction = 1600;
            break;
        case income >= 100000:
            deduction = 1700;
            break;
        default:
            console.log("not working")
            break;
    }
    return deduction;

}

// this function calculates the nssf to be paid for a particular income and depending on the type of rate per month
function nssfFunc(income,rate, cb){
    if (rate === "new")
        return cb(income,"one" ,setValue);
    else{
        return cb(income);
    }

}

// this function calculated the amount to be deducted based on the NEW RATE
function newRate(income, typeOfTier, cb){
    let tier = cb(typeOfTier);
    let amountPayed = 0.06 * income;
    if (tier === "one"){
        let deduction;
        if (amountPayed > 6000){
            // income += (amountPayed - 6000);
            // income = (income - amountPayed) +  (amountPayed - 6000);
            deduction =  6000;
        }else{
            // income -= amountPayed
            deduction = amountPayed;
        }
        return deduction;
    }
    if (tier === "two"){
        let minPay = 6001
        if(amountPayed >= minPay){
            let deduction;
            if(amountPayed > 18000){
                // income += (amountPayed - 18000);
                // income = (income - amountPayed) +  (amountPayed - 18000);
                deduction = 18000;  
            }else{
                // income -= amountPayed;
                deduction = amountPayed;
            }
            return deduction;
        }else{
            console.log("Insufficient fund to complete transction")
            return;
        }
    }
}

// this function calculated the amount to be deducted based on the OLD RATE
function oldRate(income){
    const payFrequency = {
        monthly: 400,
        biweekly: 200,
        weekly: 100,
    }
    let amountPayed = 0.05 * income;
    return function calculatePension(frequency){
        let deduction;
        if (amountPayed > payFrequency[frequency]){
            // income = (income - amountPayed) +  (amountPayed - payFrequency[frequency]);  
            deduction = payFrequency[frequency];
        }else{
            // income -= payFrequency[frequency];
            deduction = amountPayed;
        }
        return deduction;
    }
}


// this function sets a value
function setValue(value){
    return value;
}

let netPay = calculateNetPay(150000);
console.log(netPay);
