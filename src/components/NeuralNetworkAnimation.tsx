const NeuralNetworkAnimation = () => (
    <svg viewBox="0 0 800 400" className="w-full h-full">
        <defs>
            {/* Core node gradient - Black and white */}
            <radialGradient id="nodeGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                <stop offset="0%" stopColor="#000000" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#333333" stopOpacity="0.6" />
            </radialGradient>   

            {/* Output node gradient - Different shade */}
            <radialGradient id="outputNodeGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                <stop offset="0%" stopColor="#000000" stopOpacity="1" />
                <stop offset="100%" stopColor="#444444" stopOpacity="0.7" />
            </radialGradient>

            {/* Glow effect for nodes */}
            <filter id="nodeGlow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>

            {/* Stronger glow for active nodes */}
            <filter id="activeNodeGlow" x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>

            {/* Directional flow gradient - will only be visible when animated */}
            <linearGradient id="flowGradient">
                <stop offset="0%" stopColor="#CCCCCC" stopOpacity="0.1" />
                <stop offset="50%" stopColor="#000000" stopOpacity="0.9">
                    <animate
                        attributeName="offset"
                        values="0;1"
                        dur="1.5s"
                        repeatCount="1"
                        fill="freeze"
                    />
                </stop>
                <stop offset="51%" stopColor="#CCCCCC" stopOpacity="0.1">
                    <animate
                        attributeName="offset"
                        values="0.01;1.01"
                        dur="1.5s"
                        repeatCount="1"
                        fill="freeze"
                    />
                </stop>
                <stop offset="100%" stopColor="#CCCCCC" stopOpacity="0.1" />
            </linearGradient>
        </defs>

        {/* Neural network structure */}

        {/* Input Layer - 5 nodes */}
        {[0, 1, 2, 3, 4].map((i) => (
            <g key={`input-${i}`}>
                {/* Input node activates first */}
                <circle
                    cx="80"
                    cy={50 + i * 60}
                    r="15"
                    fill="url(#nodeGradient)"
                    stroke="#000000"
                    strokeWidth="2"
                    filter="url(#nodeGlow)"
                    opacity="0.7"
                >
                    {/* Node activation when processing starts - with staggered timing for nodes */}
                    <animate
                        attributeName="opacity"
                        values="0.7;1;0.9"
                        dur="0.5s"
                        begin={`${i * 0.2}s`}
                        fill="freeze"
                    />
                    <animate
                        attributeName="filter"
                        values="url(#nodeGlow);url(#activeNodeGlow);url(#nodeGlow)"
                        dur="1s"
                        begin={`${i * 0.2}s`}
                        fill="freeze"
                    />
                </circle>

                {/* Connections to first hidden layer - only activate after their source input node */}
                {[0, 1, 2, 3, 4, 5].map((j) => {
                    // Each connection only activates after its input node
                    const startTime = i * 0.2 + 0.2; // Starts after input node activates

                    return (
                        <line
                            key={`in-${i}-h1-${j}`}
                            x1="80"
                            y1={50 + i * 60}
                            x2="200"
                            y2={30 + j * 45}
                            stroke="#CCCCCC"
                            strokeWidth="1.5"
                            strokeOpacity="0.2"
                        >
                            {/* Connection only activates after its source node */}
                            <animate
                                attributeName="stroke"
                                values="#CCCCCC;#000000;#666666"
                                dur="1s"
                                begin={`${startTime}s`}
                                fill="freeze"
                            />
                            <animate
                                attributeName="stroke-opacity"
                                values="0.2;0.8;0.6"
                                dur="1s"
                                begin={`${startTime}s`}
                                fill="freeze"
                            />

                            {/* Flow animation along the connection */}
                            {/* <animate
                                attributeName="stroke-dasharray"
                                values="1,150;150,1"
                                dur="0.8s"
                                begin={`${startTime}s`}
                                fill="freeze"
                            /> */}
                        </line>
                    );
                })}
            </g>
        ))}

        {/* First Hidden Layer - 6 nodes */}
        {[0, 1, 2, 3, 4, 5].map((j) => {
            // Activate only after all connections from input layer have arrived
            const h1StartTime = 1.8; // All input connections finish around this time
            // const nodeIndex = j;

            return (
                <g key={`hidden1-${j}`}>
                    {/* Hidden layer 1 node - activates once input signals arrive */}
                    <circle
                        cx="200"
                        cy={30 + j * 45}
                        r="15"
                        fill="url(#nodeGradient)"
                        stroke="#000000"
                        strokeWidth="2"
                        filter="url(#nodeGlow)"
                        opacity="0.7"
                    >
                        {/* Node activates once input signals arrive (with slight variation for visual effect) */}
                        <animate
                            attributeName="opacity"
                            values="0.7;1;0.9"
                            dur="0.5s"
                            begin={`${h1StartTime + j * 0.1}s`}
                            fill="freeze"
                        />
                        <animate
                            attributeName="filter"
                            values="url(#nodeGlow);url(#activeNodeGlow);url(#nodeGlow)"
                            dur="1s"
                            begin={`${h1StartTime + j * 0.1}s`}
                            fill="freeze"
                        />
                    </circle>

                    {/* Connections to second hidden layer - only activate after 1st hidden layer nodes */}
                    {[0, 1, 2, 3, 4, 5, 6, 7].map((k) => {
                        // Each connection only activates after its source node in the first hidden layer
                        const startConnectTime = h1StartTime + j * 0.1 + 0.5; // After the node activates

                        return (
                            <line
                                key={`h1-${j}-h2-${k}`}
                                x1="200"
                                y1={30 + j * 45}
                                x2="330"
                                y2={20 + k * 40}
                                stroke="#CCCCCC"
                                strokeWidth="1.5"
                                strokeOpacity="0.2"
                            >
                                {/* Connection only activates after its source node */}
                                <animate
                                    attributeName="stroke"
                                    values="#CCCCCC;#000000;#666666"
                                    dur="1s"
                                    begin={`${startConnectTime}s`}
                                    fill="freeze"
                                />
                                <animate
                                    attributeName="stroke-opacity"
                                    values="0.2;0.8;0.6"
                                    dur="1s"
                                    begin={`${startConnectTime}s`}
                                    fill="freeze"
                                />

                                {/* Flow animation along the connection */}
                                {/* <animate
                                    attributeName="stroke-dasharray"
                                    values="1,150;150,1"
                                    dur="0.8s"
                                    begin={`${startConnectTime}s`}
                                    fill="freeze"
                                /> */}
                            </line>
                        );
                    })}
                </g>
            );
        })}

        {/* Second Hidden Layer - 8 nodes */}
        {[0, 1, 2, 3, 4, 5, 6, 7].map((j) => {
            // Activate only after all connections from first hidden layer have arrived
            const h2StartTime = 3.8; // First hidden layer connections finish around this time
            // const nodeIndex = j;

            return (
                <g key={`hidden2-${j}`}>
                    {/* Hidden layer 2 node - activates once signals from layer 1 arrive */}
                    <circle
                        cx="330"
                        cy={20 + j * 40}
                        r="15"
                        fill="url(#nodeGradient)"
                        stroke="#000000"
                        strokeWidth="2"
                        filter="url(#nodeGlow)"
                        opacity="0.7"
                    >
                        {/* Node activates once signals arrive (with slight variation for visual effect) */}
                        <animate
                            attributeName="opacity"
                            values="0.7;1;0.9"
                            dur="0.5s"
                            begin={`${h2StartTime + j * 0.1}s`}
                            fill="freeze"
                        />
                        <animate
                            attributeName="filter"
                            values="url(#nodeGlow);url(#activeNodeGlow);url(#nodeGlow)"
                            dur="1s"
                            begin={`${h2StartTime + j * 0.1}s`}
                            fill="freeze"
                        />
                    </circle>

                    {/* Connections to third hidden layer - only activate after 2nd hidden layer nodes */}
                    {[0, 1, 2, 3, 4, 5].map((k) => {
                        // Each connection only activates after its source node in the second hidden layer
                        const startConnectTime = h2StartTime + j * 0.1 + 0.5; // After the node activates

                        return (
                            <line
                                key={`h2-${j}-h3-${k}`}
                                x1="330"
                                y1={20 + j * 40}
                                x2="470"
                                y2={30 + k * 50}
                                stroke="#CCCCCC"
                                strokeWidth="1.5"
                                strokeOpacity="0.2"
                            >
                                {/* Connection only activates after its source node */}
                                <animate
                                    attributeName="stroke"
                                    values="#CCCCCC;#000000;#666666"
                                    dur="1s"
                                    begin={`${startConnectTime}s`}
                                    fill="freeze"
                                />
                                <animate
                                    attributeName="stroke-opacity"
                                    values="0.2;0.8;0.6"
                                    dur="1s"
                                    begin={`${startConnectTime}s`}
                                    fill="freeze"
                                />

                                {/* Flow animation along the connection */}
                                {/* <animate
                                    attributeName="stroke-dasharray"
                                    values="1,150;150,1"
                                    dur="0.8s"
                                    begin={`${startConnectTime}s`}
                                    fill="freeze"
                                /> */}
                            </line>
                        );
                    })}
                </g>
            );
        })}

        {/* Third Hidden Layer - 6 nodes */}
        {[0, 1, 2, 3, 4, 5].map((j) => {
            // Activate only after all connections from second hidden layer have arrived
            const h3StartTime = 5.8; // Second hidden layer connections finish around this time
            // const nodeIndex = j;

            return (
                <g key={`hidden3-${j}`}>
                    {/* Hidden layer 3 node - activates once signals from layer 2 arrive */}
                    <circle
                        cx="470"
                        cy={30 + j * 50}
                        r="15"
                        fill="url(#nodeGradient)"
                        stroke="#000000"
                        strokeWidth="2"
                        filter="url(#nodeGlow)"
                        opacity="0.7"
                    >
                        {/* Node activates once signals arrive (with slight variation for visual effect) */}
                        <animate
                            attributeName="opacity"
                            values="0.7;1;0.9"
                            dur="0.5s"
                            begin={`${h3StartTime + j * 0.1}s`}
                            fill="freeze"
                        />
                        <animate
                            attributeName="filter"
                            values="url(#nodeGlow);url(#activeNodeGlow);url(#nodeGlow)"
                            dur="1s"
                            begin={`${h3StartTime + j * 0.1}s`}
                            fill="freeze"
                        />
                    </circle>

                    {/* Connections to output layer - only activate after 3rd hidden layer nodes */}
                    {[0, 1, 2, 3].map((k) => {
                        // Each connection only activates after its source node in the third hidden layer
                        const startConnectTime = h3StartTime + j * 0.1 + 0.5; // After the node activates

                        return (
                            <line
                                key={`h3-${j}-out-${k}`}
                                x1="470"
                                y1={30 + j * 50}
                                x2="600"
                                y2={50 + k * 70}
                                stroke="#CCCCCC"
                                strokeWidth="1.5"
                                strokeOpacity="0.2"
                            >
                                {/* Connection only activates after its source node */}
                                <animate
                                    attributeName="stroke"
                                    values="#CCCCCC;#000000;#666666"
                                    dur="1s"
                                    begin={`${startConnectTime}s`}
                                    fill="freeze"
                                />
                                <animate
                                    attributeName="stroke-opacity"
                                    values="0.2;0.8;0.6"
                                    dur="1s"
                                    begin={`${startConnectTime}s`}
                                    fill="freeze"
                                />

                                {/* Flow animation along the connection */}
                                {/* <animate
                                    attributeName="stroke-dasharray"
                                    values="1,150;150,1"
                                    dur="0.8s"
                                    begin={`${startConnectTime}s`}
                                    fill="freeze"
                                /> */}
                            </line>
                        );
                    })}
                </g>
            );
        })}

        {/* Output Layer - 4 nodes with different color */}
        {[0, 1, 2, 3].map((j) => {
            // Final output nodes activate only after signals from 3rd hidden layer arrive
            const outStartTime = 7.8; // Third hidden layer connections finish around this time

            return (
                <g key={`output-${j}`}>
                    {/* Output node - activates last with dramatic effect */}
                    <circle
                        cx="600"
                        cy={50 + j * 70}
                        r="16"
                        fill="url(#outputNodeGradient)"
                        stroke="#000000"
                        strokeWidth="2.5"
                        filter="url(#nodeGlow)"
                        opacity="0.7"
                    >
                        {/* Output nodes activate with a final dramatic pulsing effect */}
                        <animate
                            attributeName="opacity"
                            values="0.7;1;0.9"
                            dur="1.0s"
                            begin={`${outStartTime + j * 0.2}s`}
                            fill="freeze"
                        />
                        <animate
                            attributeName="r"
                            values="16;19;17"
                            dur="1.0s"
                            begin={`${outStartTime + j * 0.2}s`}
                            fill="freeze"
                        />
                        <animate
                            attributeName="filter"
                            values="url(#nodeGlow);url(#activeNodeGlow);url(#nodeGlow)"
                            dur="2s"
                            begin={`${outStartTime + j * 0.2}s`}
                            fill="freeze"
                        />

                        {/* Add subtle pulse animation after activation */}
                        <animate
                            attributeName="r"
                            values="17;18;17"
                            dur="3s"
                            begin={`${outStartTime + j * 0.2 + 1}s`}
                            repeatCount="indefinite"
                        />
                    </circle>
                </g>
            );
        })}

        {/* Layer Labels */}
        <text x="80" y="20" textAnchor="middle" fill="#666666" fontSize="14">Input</text>
        {/* <text x="200" y="20" textAnchor="middle" fill="#666666" fontSize="14">Hidden 1</text> */}
        {/* <text x="330" y="20" textAnchor="middle" fill="#666666" fontSize="14">Hidden 2</text> */}
        {/* <text x="470" y="20" textAnchor="middle" fill="#666666" fontSize="14">Hidden 3</text> */}
        <text x="600" y="20" textAnchor="middle" fill="#666666" fontSize="14">Output</text>
    </svg>
);


export default NeuralNetworkAnimation;