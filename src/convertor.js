import { Box, MenuItem, Select, makeStyles, Input } from "@material-ui/core";
import React, { useState } from "react";
import { LoadData } from "./LoadData";

export const convertCurrency = (from, fromRate, toRate) => {
  return (from / toRate) * fromRate;
};

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  flexBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  selectBox: {
    width: theme.spacing(30),
  },
  inputBox: {
    width: "100%",
  },
}));

const Convertor = () => {
  const classes = useStyles();
  const [from, setFrom] = useState();
  const [fromValue, setFromValue] = useState(0);
  const [to, setTo] = useState();
  const [toValue, setToValue] = useState(0);

  const currencyRate = LoadData();

  React.useEffect(() => {
    if (currencyRate) {
      const keys = Object.keys(currencyRate);
      if (keys) {
        setFrom(keys[0]);
        setTo(keys[1]);
      }
    }
  }, [currencyRate]);

  React.useEffect(() => {
    if (currencyRate)
      setToValue(
        convertCurrency(fromValue, currencyRate[from], currencyRate[to])
      );
  }, [from, fromValue, to, currencyRate]);

  return (
    <Box className={classes.container}>
      <Box width="50%">
        <h3 cy-test-id="header">Convertor</h3>
        <Box className={classes.flexBox}>
          <Box>
            <Box mb={1}>From</Box>
            <Select
              value={from ?? ""}
              variant="outlined"
              onChange={(e) => {
                setFrom(e.target.value);
                setFromValue(1);
              }}
              className={classes.selectBox}
              cy-test-id="left-currency-select"
            >
              {currencyRate &&
                Object.keys(currencyRate).map((item, index) => (
                  <MenuItem key={index} value={item}>
                    <Box>{item}</Box>
                  </MenuItem>
                ))}
            </Select>
            <Box mt={2} width={1}>
              <Input
                value={fromValue?.toString() ?? ""}
                className={classes.inputBox}
                onChange={(e) => setFromValue(e.target.value)}
                cy-test-id="left-currency"
              />
            </Box>
          </Box>
          <Box>
            <Box mb={1}>To</Box>
            <Select
              value={to ?? ""}
              onChange={(e) => setTo(e.target.value)}
              className={classes.selectBox}
              variant="outlined"
              cy-test-id="right-currency-select"
            >
              {currencyRate &&
                Object.keys(currencyRate).map((item, index) => (
                  <MenuItem key={index} value={item}>
                    <Box>{item}</Box>
                  </MenuItem>
                ))}
            </Select>
            <Box mt={2} width={1}>
              <Input
                value={toValue?.toString() ?? ""}
                className={classes.inputBox}
                disabled
                cy-test-id="right-currency"
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Convertor;
