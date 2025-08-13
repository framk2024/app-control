// src/app/models/relay.model.ts
export interface RelayStatus {
  relay_1: 'on' | 'off';
  relay_2: 'on' | 'off';
  relay_3: 'on' | 'off';
  relay_4: 'on' | 'off';
}

export interface ApiResponse {
  status: string;
  message: string;
  relays: RelayStatus;
}