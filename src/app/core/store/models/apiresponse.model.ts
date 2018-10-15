export interface ApiResponse {
    success: boolean;
    errors?: any[];
    debug:   Debug;
}

export interface Debug {
    message?:     string;
    file?:        string;
    trace?:       string[];
    actionTime?: string;
    requestIp?:  string;
    status?:      number;
}

export interface Status {
    loading: boolean;
    loaded?: boolean;
    error?: boolean;
}

export interface Debug {
    action_time: string;
    request_ip: string;
    requestStatus: boolean;
}
