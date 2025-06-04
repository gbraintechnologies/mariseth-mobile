import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet } from "react-native";

import { useToast } from "react-native-toast-notifications";

import AppText from "./apptext";

interface ResendTimerProps {
  setOtp: () => void;
}

const ResendTimer: React.FC<ResendTimerProps> = ({ setOtp }) => {
  const [resendTimer, setResendTimer] = useState<number>(60);
  const [resendLoader, setResendLoader] = useState<boolean>(false);

  const toast = useToast();

  useEffect(() => {
    const timerId = setInterval(() => {
      setResendTimer((prev) => {
        if (prev > 0) return prev - 1;
        clearInterval(timerId);
        return prev;
      });
    }, 1000);
    return () => clearInterval(timerId);
  }, [resendTimer]);

  const handleResendCode = async () => {
    if (resendTimer > 0) return;
    setResendLoader(true);
    setTimeout(() => {
      setOtp();
      setResendTimer(60);
      setResendLoader(false);
    }, 200);
  };

  return (
    <Pressable
      style={styles.resendButton}
      disabled={resendTimer > 0 || resendLoader}
      onPress={handleResendCode}
    >
      <AppText fontSize={14} fontFamily="Regular" color="textPrimary">
        Didn't receive a code?{" "}
      </AppText>

      {resendLoader ? (
        <AppText fontSize={14} fontFamily="Regular" color="textPrimary">
          Sending...
        </AppText>
      ) : resendTimer > 0 ? null : (
        <AppText fontSize={14} fontFamily="Regular" color="primary">
          Click to re-send
        </AppText>
      )}

      {resendTimer > 0 && (
        <AppText fontFamily="Bold" fontSize={14} color="primary">
          {`${resendTimer}s`}
        </AppText>
      )}
    </Pressable>
  );
};

export default ResendTimer;
const styles = StyleSheet.create({
  resendButton: {
    width: "100%",
    flexDirection: "row",
  },
});
