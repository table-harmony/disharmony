"use client";

import { Room } from "@prisma/client";

import { env } from "@/env";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useSession } from "@/components/session-provider";

import { generateTokenAction } from "./actions";

import "@stream-io/video-react-sdk/dist/css/styles.css";
import {
  Call,
  CallControls,
  CallParticipantsList,
  SpeakerLayout,
  StreamCall,
  StreamTheme,
  StreamVideo,
  StreamVideoClient,
} from "@stream-io/video-react-sdk";

export function VideoPlayer({ room }: { room: Room }) {
  const session = useSession();

  const [client, setClient] = useState<StreamVideoClient | null>(null);
  const [call, setCall] = useState<Call | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!room) return;
    if (!session.user) return;

    const client = new StreamVideoClient({
      apiKey: env.NEXT_PUBLIC_STREAM_API_KEY,
      user: {
        id: session.user.id,
        name: session.user.username ?? undefined,
        image: session.user.picture ?? undefined,
      },
      tokenProvider: generateTokenAction,
    });

    const call = client.call("default", room.id);
    call.join({ create: true });

    setClient(client);
    setCall(call);

    return () => {
      call
        .leave()
        .then(() => client.disconnectUser())
        .catch(console.error);
    };
  }, [session, room]);

  return (
    client &&
    call && (
      <StreamVideo client={client}>
        <StreamTheme>
          <StreamCall call={call}>
            <SpeakerLayout />
            <CallControls
              onLeave={() => {
                router.push("/");
              }}
            />
            <CallParticipantsList onClose={() => undefined} />
          </StreamCall>
        </StreamTheme>
      </StreamVideo>
    )
  );
}
