/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Button } from "antd";
import { AudioOutlined } from "@ant-design/icons";

export default function VoiceToTextRecognition({
  onTranscript,
  startAutomatically = false,
}) {
  const [recognition, setRecognition] = useState(null);
  const [listening, setListening] = useState(false);

  useEffect(() => {
    if ("webkitSpeechRecognition" in window) {
      const speechRecognition = new window.webkitSpeechRecognition();
      speechRecognition.continuous = false;
      speechRecognition.interimResults = false;
      speechRecognition.lang = "en-US";

      speechRecognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        onTranscript(transcript);
        setListening(false);
      };

      speechRecognition.onerror = () => {
        setListening(false);
      };

      setRecognition(speechRecognition);
    } else {
      console.error("Your browser does not support speech recognition.");
    }
  }, [onTranscript]);

  const startListening = () => {
    if (recognition) {
      recognition.start();
      setListening(true);
    }
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
      setListening(false);
    }
  };

  useEffect(() => {
    if (startAutomatically) {
      startListening();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startAutomatically]);

  return (
    <Button
      type="default"
      className=""
      icon={<AudioOutlined />}
      onClick={listening ? stopListening : startListening}
    >
      {listening ? "Stop Listening" : "Start Voice Search"}
    </Button>
  );
}
