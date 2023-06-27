import React, { forwardRef, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import DownloadIcon from "@mui/icons-material/Download";
import { Link, Skeleton, Slider } from "@mui/material";
import { prominent } from "color.js";
import { PlayArrow, Pause, Stop } from "@mui/icons-material";
import { ReactComponent as Vectorblob1 } from "./Vectorblob1.svg";
import { MotionConfig, motion } from "framer-motion";

export default function CardV2(props) {
  const [color, setColor] = React.useState([0, 0, 0]);
  const [audio, setAudio] = useState(new Audio());
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  React.useEffect(() => {
    async function handleColorExtract() {
      if (!props.imageurl) {
        return;
      }
      const color = await prominent(`https://corsproxy.io/?${props.imageurl}`, {
        amount: 2,
      });
      function compareColors(color1, color2) {
        // Compute luminance for color 1
        let luminance1 =
          0.2126 * color1[0] + 0.7152 * color1[1] + 0.0722 * color1[2];

        // Compute luminance for color 2
        let luminance2 =
          0.2126 * color2[0] + 0.7152 * color2[1] + 0.0722 * color2[2];

        // Compare luminance values
        if (luminance1 > luminance2) {
          return color1;
        } else {
          return color2;
        }
      }

      let brightestColor = compareColors(color[0], color[1]);
      console.log(brightestColor);
      setColor(brightestColor);
    }
    handleColorExtract();
  }, [props.imageurl]);

  React.useEffect(() => {
    props.pull_color(color);
  }, [color]);

  function handlePlayPause() {
    setIsPlaying((prevPlay) => !prevPlay);
  }

  //when fetch complete change song to current
  React.useEffect(() => {
    audio.pause();
    setIsPlaying(false);
    setAudio(new Audio(props.link128kpbs));
  }, [props.link128kpbs]);

  //start/pause music
  React.useEffect(() => {
    if (audio.src === "") {
      return;
    }
    if (!isPlaying) {
      audio.pause();
    } else {
      audio.play();
      console.log(audio);
    }
    // eslint-disable-next-line
  }, [isPlaying, audio]);

  const inter = "'Inter', sans-serif";

  /*
  imageurl
  header
  link128kbps
  */

  return (
    <Card
      className="card"
      {...props}
      sx={{
        backgroundClip: "padding-box",
        display: "flex",
        boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.25)",
        margin: "25px 40px 50px 30px",
        borderRadius: "10px",
        overflow: "visible",
        background: "#000",
      }}
    >
      <motion.div
        className="card-holder"
        transition={{ duration: 0.5 }}
        initial={{
          background: `radial-gradient(300% 100% at 50% 100%, black 20%, rgba(${Math.min(
            255,
            color[0] * 1
          )},${Math.min(255, color[1] * 1)},${Math.min(
            255,
            color[2] * 1
          )},1) 100%)`,
        }}
        animate={{
          background: `radial-gradient(300% 100% at 50% 100%, black 20%, rgba(${Math.min(
            255,
            color[0] * 1
          )},${Math.min(255, color[1] * 1)},${Math.min(
            255,
            color[2] * 1
          )},1) 100%)`,
        }}
        style={{
          borderRadius: "10px",
          width: "250px",
          height: "330px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          border: "1px solid rgba( 255, 255, 255, 0.15 )",
          borderBottomColor: "rgba( 0, 0, 0, 1 )",
          borderTopColor: "rgba( 255, 255, 255, 0.4 )",
          zIndex: "2",
        }}
      >
        {props.imageurl ? (
          <Box
            component="img"
            sx={{
              width: "170px",
              height: "170px",
              objectFit: "cover",
              borderRadius: "10px",
              marginTop: "30px",
              boxShadow: "0px 20px 20px 20px rgba(0, 0, 0, 0.35)",
            }}
            src={props.imageurl}
            alt="img"
          />
        ) : (
          <Skeleton
            variant="rectangular"
            sx={{ marginTop: "30px", zIndex: "2" }}
            width="170px"
            height="170px"
          />
        )}
        <Typography
          component="div"
          variant="h5"
          sx={{
            fontFamily: inter,
            fontWeight: "600",
            letterSpacing: "-1.4px",
            marginTop: "30px",
            fontSize: "15px",
            color: "white",
          }}
        >
          {props.header}
        </Typography>
        {props.imageurl && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
              width: "100%",
              marginTop: "20px",
            }}
          >
            <Box sx={{ background: "#1fd860", borderRadius: "100%" }}>
              <IconButton onClick={handlePlayPause} aria-label="play/pause">
                {!isPlaying && (
                  <PlayArrowIcon
                    sx={{ height: 20, width: 20, color: "black" }}
                  />
                )}
                {isPlaying && (
                  <PauseIcon sx={{ height: 20, width: 20, color: "black" }} />
                )}
              </IconButton>
            </Box>
            <Box sx={{ background: "#1fd860", borderRadius: "100%" }}>
              <Link
                href={props.link128kpbs}
                sx={{ WebkitTapHighlightColor: "transparent" }}
              >
                <IconButton aria-label="download">
                  <DownloadIcon
                    sx={{ height: 20, width: 20, color: "black" }}
                  />
                </IconButton>
              </Link>
            </Box>
          </Box>
        )}
      </motion.div>
      <motion.svg
        style={{
          position: "relative",
          zIndex: "-2",
          bottom: "50px",
          left: "auto",
          right: "auto",
          marginLeft: "-260px",
          scale: "1.7",
        }}
        width="249"
        height="411"
        viewBox="0 0 249 411"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M229.868 216.959L229.792 219.07L229.784 221.181L229.844 223.298L229.971 225.424L230.165 227.565L230.422 229.725L230.741 231.907L231.118 234.117L231.551 236.358L232.036 238.632L232.569 240.945L233.145 243.297L233.76 245.691L234.407 248.129L235.081 250.612L235.775 253.14L236.483 255.714L237.196 258.332L237.908 260.993L238.61 263.695L239.296 266.435L239.957 269.209L240.586 272.014L241.176 274.846L241.719 277.698L242.208 280.566L242.638 283.444L243.001 286.325L243.293 289.203L243.509 292.071L243.643 294.922L243.694 297.75L243.657 300.548L243.531 303.309L243.312 306.026L243 308.693L242.594 311.303L242.092 313.85L241.495 316.327L240.803 318.728L240.017 321.048L239.137 323.281L238.166 325.423L237.106 327.469L235.959 329.414L234.729 331.255L233.418 332.99L232.031 334.616L230.57 336.13L229.042 337.532L227.45 338.82L225.798 339.995L224.093 341.057L222.339 342.007L220.542 342.847L218.706 343.579L216.837 344.206L214.942 344.732L213.024 345.16L211.091 345.494L209.146 345.741L207.196 345.905L205.245 345.993L203.299 346.011L201.362 345.965L199.438 345.863L197.533 345.711L195.65 345.518L193.793 345.292L191.966 345.039L190.171 344.769L188.412 344.488L186.691 344.205L185.01 343.928L183.371 343.664L181.776 343.421L180.224 343.206L178.719 343.026L177.258 342.888L175.843 342.797L174.474 342.761L173.149 342.783L171.867 342.869L170.628 343.024L169.43 343.25L168.271 343.552L167.149 343.932L166.062 344.392L165.007 344.934L163.982 345.558L162.984 346.264L162.011 347.052L161.059 347.922L160.125 348.871L159.207 349.897L158.301 350.998L157.405 352.17L156.515 353.409L155.628 354.712L154.743 356.075L153.855 357.492L152.963 358.959L152.065 360.471L151.157 362.022L150.239 363.609L149.308 365.224L148.362 366.863L147.399 368.52L146.42 370.19L145.421 371.867L144.402 373.546L143.363 375.222L142.302 376.89L141.22 378.546L140.115 380.186L138.988 381.805L137.838 383.401L136.666 384.971L135.472 386.512L134.255 388.02L133.017 389.494L131.757 390.931L130.476 392.329L129.174 393.685L127.853 394.997L126.512 396.263L125.152 397.482L123.774 398.652L122.379 399.771L120.967 400.838L119.54 401.853L118.097 402.814L116.639 403.721L115.169 404.572L113.685 405.369L112.19 406.11L110.683 406.796L109.166 407.428L107.639 408.004L106.104 408.527L104.559 408.996L103.007 409.413L101.448 409.779L99.8819 410.094L98.3096 410.361L96.7314 410.579L95.1478 410.751L93.559 410.877L91.9653 410.96L90.3669 411L88.764 410.999L87.1567 410.958L85.5452 410.879L83.9293 410.763L82.3093 410.611L80.6851 410.424L79.0566 410.204L77.4237 409.951L75.7864 409.666L74.1447 409.351L72.4984 409.005L70.8474 408.63L69.1916 408.226L67.531 407.793L65.8655 407.331L64.1951 406.841L62.5197 406.323L60.8395 405.777L59.1545 405.201L57.4649 404.596L55.7709 403.962L54.0726 403.296L52.3706 402.599L50.6651 401.87L48.9567 401.107L47.2459 400.31L45.5334 399.476L43.8198 398.606L42.106 397.697L40.3929 396.748L38.6813 395.758L36.9725 394.725L35.2678 393.647L33.5689 392.522L31.8776 391.347L30.1963 390.12L28.5273 388.837L26.8733 387.496L25.2372 386.093L23.6221 384.627L22.0312 383.093L20.4679 381.489L18.9357 379.814L17.4382 378.063L15.9791 376.236L14.562 374.332L13.1908 372.347L11.869 370.282L10.6004 368.137L9.38863 365.91L8.2372 363.602L7.14957 361.213L6.12904 358.745L5.17875 356.198L4.3016 353.576L3.50027 350.879L2.77719 348.111L2.1345 345.275L1.57406 342.375L1.09739 339.413L0.705686 336.395L0.399794 333.325L0.180201 330.207L0.0470246 327.047L0 323.851L0.0384799 320.622L0.161432 317.368L0.36744 314.093L0.654707 310.803L1.02106 307.505L1.46396 304.204L1.98051 300.906L2.56746 297.616L3.22124 294.339L3.93794 291.082L4.71339 287.849L5.54312 284.646L6.4224 281.476L7.34629 278.344L8.30963 275.254L9.30709 272.211L10.3332 269.216L11.3824 266.273L12.4489 263.384L13.5272 260.551L14.6113 257.777L15.6956 255.062L16.7744 252.406L17.8421 249.81L18.8932 247.274L19.9223 244.797L20.9244 242.378L21.8943 240.016L22.8274 237.708L23.7193 235.452L24.5657 233.246L25.3629 231.086L26.1072 228.97L26.7956 226.893L27.4253 224.851L27.9939 222.842L28.4993 220.859L28.9402 218.9L29.3153 216.959L29.624 215.031L29.866 213.113L30.0416 211.2L30.1514 209.286L30.1965 207.368L30.1784 205.441L30.099 203.502L29.9606 201.545L29.766 199.568L29.5183 197.566L29.2209 195.537L28.8775 193.479L28.4924 191.387L28.0702 189.261L27.6162 187.099L27.1358 184.9L26.6349 182.664L26.1198 180.39L25.5968 178.079L25.0725 175.733L24.5533 173.354L24.046 170.943L23.557 168.503L23.0928 166.039L22.6595 163.552L22.263 161.049L21.9091 158.533L21.6028 156.009L21.349 153.482L21.1519 150.957L21.0153 148.44L20.9423 145.935L20.9355 143.448L20.9969 140.983L21.1285 138.547L21.3316 136.143L21.6073 133.778L21.956 131.455L22.3781 129.18L22.8734 126.956L23.4412 124.789L24.0806 122.681L24.7903 120.637L25.5686 118.66L26.4134 116.751L27.3224 114.915L28.2929 113.152L29.322 111.464L30.4065 109.852L31.5429 108.317L32.7275 106.858L33.9566 105.475L35.2261 104.167L36.5319 102.932L37.8698 101.769L39.2355 100.674L40.6248 99.6451L42.0332 98.678L43.4566 97.7691L44.8907 96.9139L46.3314 96.1078L47.7747 95.3457L49.2168 94.6221L50.654 93.9314L52.0827 93.2676L53.4998 92.6247L54.9021 91.9964L56.2868 91.3762L57.6516 90.7579L58.994 90.1349L60.3121 89.5007L61.6043 88.8491L62.8692 88.1737L64.1058 87.4684L65.3132 86.7274L66.491 85.945L67.639 85.1158L68.7575 84.2347L69.8468 83.2971L70.9076 82.2986L71.941 81.2354L72.9482 80.1039L73.9306 78.9014L74.89 77.6254L75.8283 76.2739L76.7476 74.8458L77.6503 73.3401L78.5388 71.7568L79.4157 70.0963L80.2835 68.3594L81.1452 66.5478L82.0035 64.6635L82.8612 62.7092L83.7213 60.6881L84.5866 58.6039L85.4598 56.4608L86.3438 54.2636L87.2413 52.0174L88.1549 49.7284L89.0871 47.4029L90.0406 45.0479L91.0174 42.6709L92.0198 40.2798L93.0497 37.8827L94.1089 35.4883L95.1988 33.1052L96.3207 30.7424L97.4757 28.4089L98.6645 26.1137L99.8875 23.8658L101.145 21.6742L102.437 19.5476L103.763 17.4945L105.122 15.5231L106.514 13.6414L107.938 11.8567L109.392 10.1762L110.874 8.6064L112.383 7.15346L113.917 5.823L115.474 4.6201L117.051 3.54929L118.646 2.6145L120.256 1.81901L121.879 1.16547L123.512 0.655851L125.152 0.291451L126.797 0.0728661L128.443 0L130.088 0.0720718L131.73 0.287622L133.364 0.644511L134.989 1.13993L136.603 1.77041L138.203 2.53185L139.786 3.41953L141.351 4.42814L142.896 5.55183L144.419 6.78426L145.918 8.11858L147.394 9.54757L148.844 11.0636L150.268 12.6588L151.665 14.3249L153.036 16.0535L154.381 17.8361L155.699 19.664L156.992 21.5286L158.26 23.4212L159.504 25.3332L160.727 27.2561L161.929 29.1817L163.112 31.1019L164.279 33.009L165.431 34.8954L166.571 36.7543L167.702 38.5788L168.826 40.363L169.945 42.101L171.064 43.7876L172.184 45.4184L173.309 46.9892L174.441 48.4966L175.583 49.9378L176.739 51.3105L177.911 52.6134L179.102 53.8454L180.314 55.0063L181.55 56.0966L182.812 57.1173L184.103 58.0702L185.423 58.9575L186.774 59.7822L188.159 60.5478L189.577 61.2582L191.029 61.9179L192.517 62.5318L194.04 63.1054L195.598 63.6443L197.19 64.1547L198.815 64.6428L200.473 65.1152L202.162 65.5791L203.879 66.0419L205.622 66.5112L207.388 66.9947L209.173 67.5006L210.975 68.0367L212.788 68.6108L214.608 69.2306L216.431 69.9036L218.251 70.6369L220.064 71.4372L221.863 72.3107L223.645 73.2633L225.402 74.3L227.131 75.4254L228.824 76.6435L230.477 77.9573L232.086 79.3693L233.644 80.8812L235.147 82.494L236.591 84.208L237.971 86.023L239.283 87.938L240.524 89.952L241.689 92.0628L242.776 94.2682L243.781 96.5652L244.703 98.9504L245.537 101.42L246.284 103.97L246.941 106.595L247.507 109.29L247.982 112.05L248.366 114.869L248.659 117.742L248.861 120.662L248.974 123.623L249 126.619L248.941 129.643L248.798 132.688L248.577 135.749L248.278 138.819L247.908 141.893L247.469 144.963L246.966 148.024L246.404 151.071L245.788 154.099L245.124 157.102L244.417 160.076L243.673 163.017L242.898 165.921L242.099 168.786L241.28 171.607L240.45 174.384L239.613 177.114L238.777 179.795L237.947 182.428L237.13 185.012L236.332 187.546L235.558 190.032L234.813 192.472L234.104 194.866L233.435 197.216L232.811 199.526L232.237 201.798L231.715 204.036L231.25 206.243L230.845 208.423L230.502 210.58L230.224 212.718L230.012 214.843L229.868 216.959Z"
          fill="url(#gradient)"
        />
        <defs>
          <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
            <motion.stop
              offset="20%"
              transition={{ duration: 0.5 }}
              initial={{
                stopColor: `rgba(${Math.min(255, color[0] * 1)},${Math.min(
                  255,
                  color[1] * 1
                )},${Math.min(255, color[2] * 1)},1)`,
              }}
              animate={{
                stopColor: `rgba(${Math.min(255, color[0] * 1)},${Math.min(
                  255,
                  color[1] * 1
                )},${Math.min(255, color[2] * 1)},1)`,
              }}
            />
            <stop offset="60%" stopColor="#00000" />
            <stop offset="100%" stopColor="#00000" />
          </linearGradient>
        </defs>
      </motion.svg>
    </Card>
  );
}
