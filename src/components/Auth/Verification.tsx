/* eslint-disable @typescript-eslint/no-explicit-any */
import { styles } from "@/app/style/style";
import { useActivationMutation } from "@/redux/features/auth/authApi";
import { FC, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { useSelector } from "react-redux";

type Props = {
  setRoute: (route: string) => void;
};

type VerificationProps = {
  "0": string;
  "1": string;
  "2": string;
  "3": string;
};

const Verification: FC<Props> = ({ setRoute }) => {
  const { token } = useSelector((state: any) => state.auth);

  const [activation, { isSuccess, error }] = useActivationMutation();
  const [invalidError, setInvalidError] = useState<boolean>(false);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Account Activation successfully");
      setRoute("Login");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
        setInvalidError(true);
      }
    } else {
      console.log("An error occured", error);
    }
  }, [isSuccess, error]);
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const [verifyNumber, setVerifyNumber] = useState<VerificationProps>({
    "0": "",
    "1": "",
    "2": "",
    "3": "",
  });

  const verificationHandler = async () => {
    const verificationNumber = Object.values(verifyNumber).join("");
    if (verificationNumber.length < 4) {
      setInvalidError(true);
      return;
    }
    await activation({
      activation_token: token,
      activation_code: verificationNumber,
    });
  };

  const handleInputChange = (value: string, index: number) => {
    setInvalidError(false);
    const newVerifyNumber = { ...verifyNumber, [index]: value };
    setVerifyNumber(newVerifyNumber);

    if (value === "" && index > 0) {
      inputRefs[index - 1].current?.focus();
    } else if (value.length > 0 && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center  bg-gray-100 dark:bg-gray-900 p-4">
      <h2 className="text-3xl font-bold text-center mb-2 dark:text-white">
        Verify Your Account
      </h2>
      <p className="mb-2">Enter the 4-digit code sent to your device</p>
      <div className="w-[80px] h-[80px] rounded-full bg-blue-800 flex items-center justify-center mb-6">
        <VscWorkspaceTrusted className="w-10 h-10 text-white" />
      </div>

      <div className="flex space-x-4">
        {Object.keys(verifyNumber).map((key, index) => (
          <input
            key={key}
            ref={inputRefs[index]}
            type="number"
            className={`w-[60px] h-[60px] bg-transparent border-[3px] rounded-lg text-center text-2xl font-semibold outline-none dark:text-white ${
              invalidError
                ? "border-red-500 animate-shake"
                : "dark:border-white border-gray-700"
            }`}
            maxLength={1}
            value={verifyNumber[key as keyof VerificationProps]}
            onChange={(e) => handleInputChange(e.target.value, parseInt(key))}
            autoFocus={index === 0}
          />
        ))}
      </div>

      {invalidError && (
        <p className="text-red-500 mt-2 text-center">
          Invalid code, please try again.
        </p>
      )}

      <button
        onClick={verificationHandler}
        className="mt-6 w-full py-3 bg-blue-600 text-white text-lg rounded-lg hover:bg-blue-700 transition-all duration-300"
      >
        Verify OTP
      </button>
      <br />
      <h5 className="text-center pt-4 font-Poppins text-[14px] text-black dark:text-white">
        Go back to sign in page ?{" "}
        <span
          className="text-blue-600 pl-1 cursor-pointer"
          onClick={() => setRoute("Signup")}
        >
          Sign In
        </span>
      </h5>
    </div>
  );
};

export default Verification;
