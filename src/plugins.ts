export function registerPlugins(manager: any) {
    // Default pingpong plugin
    manager.registerPlugin({
        name: 'ping-pong-plugin',
        packageName: './plugins/pingpong',
        isRelative: true,
    });
}