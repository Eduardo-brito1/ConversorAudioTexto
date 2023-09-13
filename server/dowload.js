import ytdl from "ytdl-core"
import fs from "fs"
import { error } from "console"

export const dowload = (videoId) => {
  const videoURL = "https://www.youtube.com/shorts/" + videoId
  console.log("realizando o dowload:", videoId)

  ytdl(videoURL, { quality: "lowestaudio", filter: "audioonly" })
    .on("info", (info) => {
      const seconds = info.formats[0].approxDurationMs / 1000
      console.log(seconds)
      if (seconds > 60) {
        throw new error("a duração desse video e maior que 60 segundos.")
      }
    })
    .on("end", () => {
      console.log("dowload do video finalizado.")
    })
    .on("error", (error) => {
      console.log(
        "não foi possivel fazer o dowload do video. detalhes do erro: ",
        error
      )
    })
    .pipe(fs.createWriteStream("./tmp/audio.mp4"))
}
