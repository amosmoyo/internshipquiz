const fs = require("fs"); // file module

const transactions = () => {
  let arr = [];

  let arr2 = [];

  try {
    const data = fs.readFileSync("./Input Text.txt", "utf8");

    arr = data.toString().replace(/\r\n/g, "\n").split("\n");

    for (let i of arr) {
      arr2.push(i.split(":"));
    }
  } catch (err) {
    console.error(err);
  }

  let Wanjiru = 0;
  let Linda = 0;
  let Juma = 0;

  // let some = arr2.slice(0, 36);

  for (let i of arr2) {
    if (i[0] === "DEPOSIT") {
      //Deposit
      if (i[1] === "Wanjiru") {
        Wanjiru += parseFloat(i[2]);
      } else if (i[1] === "Linda") {
        Linda += parseFloat(i[2]);
      } else {
        Juma += parseFloat(i[2]);
      }
    } else if (i[0] === "TRANSFER") {
      // Transfer

      if (i[1] === "Wanjiru") {
        // Wanjiru

        // Wanjiru to =>
        if (i[2] === "Linda") {
          // Wanjiru to Linda
          if (Wanjiru >= parseFloat(i[3])) {
            Linda += parseFloat(i[3]);
            Wanjiru -= parseFloat(i[3]);
          }
        } else {
          // Wanjiru to Juma
          if (Wanjiru >= parseFloat(i[3])) {
            Juma += parseFloat(i[3]);
            Wanjiru -= parseFloat(i[3]);
          }
        }
      } else if (i[1] === "Linda") {
        // Linda

        // Linda to
        if (i[2] === "Wanjiru") {
          // Linda to Wanjiru
          if (Linda >= parseFloat(i[3])) {
            Wanjiru += parseFloat(i[3]);
            Linda -= parseFloat(i[3]);
          }
        } else {
          // Linda to Juma
          if (Linda >= parseFloat(i[3])) {
            Juma += parseFloat(i[3]);
            Linda += parseFloat(i[3]);
          }
        }
      } else {
        // Juma

        // Juma to
        if (i[2] === "Wanjiru") {
          // Juma to Wanjiru
          if (Juma >= parseFloat(i[3])) {
            Wanjiru += parseFloat(i[3]);
            Juma -= parseFloat(i[3]);
          }
        } else {
          // Juma to  Linda
          if (Juma >= parseFloat(i[3])) {
            Linda += parseFloat(i[3]);
            Juma += parseFloat(i[3]);
          }
        }
      }
    } else {
      if (i[1] === "Wanjiru" && Wanjiru >= parseFloat(i[2])) {
        Wanjiru -= parseFloat(i[2]);
      } else if (i[1] === "Linda" && Linda >= parseFloat(i[2])) {
        Linda -= parseFloat(i[2]);
      } else if (i[1] === "Juma" && Juma >= parseFloat(i[2])) {
        Juma -= parseFloat(i[2]);
      }
    }
  }

  const account = {
    Wanjiru: `Wanjiru bank balance ${Wanjiru}`,
    Linda: `Linda bank balance ${Linda}`,
    Juma: `Juma bank balance ${Juma}`
  }

  return account
};

console.log(transactions());
