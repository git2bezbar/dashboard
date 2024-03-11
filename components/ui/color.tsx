import { Label } from "@fork2e/umbrella"

export interface ColorProps  {
  currentColor?: string;
  disabled?: boolean;
}

const Color = ({ currentColor, disabled, ...props }:ColorProps) => {
  return(
    <>
      <Label htmlFor="color" className={`relative min-w-[300px] ${disabled ? "pointer-events-none cursor-not-allowed" : ""}`}>
        <input
          className=
            "flex w-full px-4 py-3 text-sm ring-offset-white file:border-0 file:font-bold file:bg-primary file:text-white file:px-8 file:py-3 file:font-raleway file:rounded-ui file:mr-4 file:cursor-pointer file:disabled:cursor-not-allowed placeholder:text-black/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pointer-events-none uppercase rounded-ui border border-black/10 bg-white"
          disabled={disabled}
          placeholder={currentColor}
        />
        <span
          className={`w-4 h-4 absolute top-[15px] right-4 rounded-md ${disabled ? "opacity-50" : ""}`}
          style={{ backgroundColor: currentColor }}
        />
        <input
          type="color"
          className=
            "flex w-full px-4 py-3 text-sm ring-offset-white file:border-0 file:font-bold file:bg-primary file:text-white file:px-8 file:py-3 file:font-raleway file:rounded-ui file:mr-4 file:cursor-pointer file:disabled:cursor-not-allowed placeholder:text-black/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 absolute bottom-0 right-0 opacity-0"
          value={currentColor}
          {...props}
        />
      </Label>
    </>
  )
}
Color.displayName = "Color"

export { Color }