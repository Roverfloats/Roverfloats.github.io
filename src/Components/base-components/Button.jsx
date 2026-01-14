function Button({onClick, text}) {
  return (
    <button className="w-auto h-[40px] px-[10px] bg-[#00c3ff] mx-[10px]" onClick={onClick}>{text}</button>
  )
}

export default Button
