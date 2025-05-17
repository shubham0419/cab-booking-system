import { REGEXP_ONLY_DIGITS } from "input-otp"

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"

export function InputOTPPattern({setOtp}:{setOtp:React.Dispatch<React.SetStateAction<string>>}) {

  return (
    <InputOTP onChange={(e)=>setOtp(e)} maxLength={6} pattern={REGEXP_ONLY_DIGITS}>
      <InputOTPGroup >
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  )
}
