export const generateRoomCode = (existingRoomCodes: any) => {
  const length = 6;
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let code = "";

  // console.log(getRooms());

  while (true) {
    let result = [];
    for (let i = 0; i < length; i++) {
      result.push(
        characters.charAt(Math.floor(Math.random() * characters.length))
      );
    }
    code = result.join("");
    if (!existingRoomCodes.includes(code)) break;
  }

  return code;
};
