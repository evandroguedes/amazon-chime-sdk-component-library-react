// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import React from 'react';

import { ControlBarButton } from '../../ui/ControlBar/ControlBarItem';
import { Microphone } from '../../ui/icons';
import { useMeetingManager } from '../../../providers/MeetingProvider';
import { useAudioInputs } from '../../../providers/DevicesProvider';
import { useToggleLocalMute } from '../../../hooks/sdk/useToggleLocalMute';
import { DeviceConfig } from '../../../types';
import { isOptionActive } from '../../../utils/device-utils';
import { PopOverItemProps } from '../../ui/PopOver/PopOverItem';

const AudioInputControl: React.FC = () => {
  const meetingManager = useMeetingManager();
  const { muted, toggleMute } = useToggleLocalMute();
  const audioInputConfig: DeviceConfig = {
    additionalDevices: true
  };
  const { devices, selectedDevice } = useAudioInputs(audioInputConfig);

  const dropdownOptions: PopOverItemProps[] = devices.map(device => ({
    children: <span>{device.label}</span>,
    checked: isOptionActive(selectedDevice, device.deviceId),
    onClick: (): Promise<void> =>
      meetingManager.selectAudioInputDevice(device.deviceId)
  }));

  return (
    <ControlBarButton
      icon={<Microphone muted={muted} />}
      onClick={toggleMute}
      label={muted ? 'Unmute' : 'Mute'}
      popOver={dropdownOptions}
    />
  );
};

export default AudioInputControl;
