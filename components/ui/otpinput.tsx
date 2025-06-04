import React, { FC, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";

import { colors } from "@/constants/colors";
import { isIOS, largeScreen } from "@/constants/generalconstants";
// import useAuthStore from "@/stores/useauthstore";

const cell_count = 4;
type OtpInputProps = {
  onOtpEntered: any;
  clearValue: any;
  borderColor: any;
};
const OtpInput: FC<OtpInputProps> = ({
  onOtpEntered,
  clearValue,
  borderColor,
}) => {
  const [value, setValue] = useState("");
  const ref = useBlurOnFulfill({ value, cellCount: cell_count });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  // const { onTapInput } = useAuthStore();

  useEffect(() => {
    if (value.length === cell_count) {
      onOtpEntered(value);
    }
  }, [value]);

  useEffect(() => {
    if (clearValue) {
      setValue("");
    }
  }, [clearValue]);
  return (
    <CodeField
      ref={ref}
      {...props}
      caretHidden={false}
      value={value}
      onChangeText={setValue}
      cellCount={cell_count}
      rootStyle={[styles.codeFieldRoot, { borderColor: borderColor }]}
      keyboardType="number-pad"
      textContentType="oneTimeCode"
      // autoComplete={Platform.select({
      //   android: "sms-otp",
      //   default: "one-time-code",
      // })}

      autoComplete={isIOS ? "one-time-code" : "sms-otp"}
      testID="my-code-input"
      // onFocus={() => onTapInput()}
      renderCell={({ index, symbol, isFocused }) => (
        <View
          onLayout={getCellOnLayoutHandler(index)}
          key={index}
          style={[
            styles.cell,

            {
              borderColor: isFocused ? colors?.primary : borderColor,
            },
          ]}
        >
          <Text style={[styles.cellText, { color: colors.textPrimary }]}>
            {symbol || (isFocused ? <Cursor /> : null)}
          </Text>
        </View>
      )}
    />
  );
};

export default OtpInput;
const styles = StyleSheet.create({
  root: {
    height: "auto",
    width: "100%",
  },

  codeFieldRoot: {
    width: "100%",
    justifyContent: "space-between",
  },
  cell: {
    width: "20%",
    height: largeScreen ? 55 : 45,
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  cellText: {
    fontSize: 21,
    fontFamily: "NexaBold",
    textAlign: "center",
    textAlignVertical: "center",
  },
});
