---
title: Load Balancer Health Checks
description: Learn how to configure and troubleshoot health checks for Civo load balancers to ensure traffic is routed only to healthy backend instances.
sidebar_position: 5
---

<head>
  <title>Load Balancer Health Checks | Civo Documentation</title>
</head>

## Overview

Health checks monitor the status of your backend instances to ensure that the load balancer only routes traffic to healthy targets. When an instance fails a health check, it is temporarily removed from the pool until it passes subsequent checks.

Properly configured health checks are essential for maintaining application availability and ensuring users are not routed to unhealthy or unresponsive instances.

## How Health Checks Work

The load balancer periodically sends requests to each backend instance on a specified port and path. Based on the response, the load balancer determines whether the instance is healthy:

1. **Healthy instance**: Returns a successful response within the timeout period. Traffic continues to be routed to this instance.
2. **Unhealthy instance**: Fails to respond or returns an error. After reaching the unhealthy threshold, traffic is no longer routed to this instance.
3. **Recovery**: Once an unhealthy instance starts passing health checks again (meeting the healthy threshold), it is returned to the pool.

## Configuration Options

When configuring health checks for your load balancer instance pool, you can specify the following options:

### Health Check Port

The port on your backend instances where the health check request is sent. This should be the port where your application's health endpoint is exposed.

- **Example**: `8080` for an application running on port 8080

### Health Check Path

The HTTP path used for health check requests. Your application should return a `2xx` status code at this path when healthy.

- **Default**: `/`
- **Common paths**: `/health`, `/healthz`, `/status`, `/ready`

### Protocol

The protocol used for health checks:

- **HTTP**: Sends an HTTP GET request and expects a `2xx` response
- **TCP**: Attempts to establish a TCP connection; success indicates the instance is healthy

### Interval

How frequently the load balancer sends health check requests to each backend instance.

- **Default**: 10 seconds
- **Recommendation**: Set based on how quickly you need to detect failures versus the load on your instances

### Timeout

The maximum time the load balancer waits for a response before marking the health check as failed.

- **Default**: 5 seconds
- **Note**: Timeout should be less than the interval to prevent overlapping checks

### Unhealthy Threshold

The number of consecutive failed health checks before an instance is marked as unhealthy and removed from the pool.

- **Default**: 3
- **Lower values**: Faster detection but more sensitive to transient issues

### Healthy Threshold

The number of consecutive successful health checks before an unhealthy instance is returned to the pool.

- **Default**: 2
- **Higher values**: More confidence that the instance has recovered but slower return to service

## Troubleshooting Unhealthy Targets

If your instances are being marked as unhealthy, check the following:

### 1. Verify the Health Endpoint

Ensure your application exposes a health endpoint at the configured path:

```bash
# From within the instance
curl -v http://localhost:<port><path>
```

The response should return a `2xx` status code.

### 2. Check Firewall Rules

Ensure your firewall allows traffic from the load balancer to the health check port. The load balancer uses its private IP to reach backend instances.

### 3. Verify the Application is Running

Check that your application is running and listening on the expected port:

```bash
# Check if the port is listening
netstat -tlnp | grep <port>
# or
ss -tlnp | grep <port>
```

### 4. Review Application Logs

Check your application logs for errors that might cause the health endpoint to fail:

```bash
# For systemd services
journalctl -u <service-name> -f

# For containerized applications
docker logs <container-id>
```

### 5. Test from Another Instance

From another instance in the same network, verify connectivity to the health endpoint:

```bash
curl -v http://<instance-private-ip>:<port><path>
```

## Best Practices

### Design Meaningful Health Checks

Your health endpoint should verify that the application can handle requests, not just that it's running:

- Check database connectivity
- Verify required services are available
- Return unhealthy if the application is overloaded

### Use Appropriate Timeouts

Set timeouts based on your application's response time:

- For fast endpoints: 2-5 seconds
- For endpoints that perform checks: 5-10 seconds
- Always set timeout less than interval

### Separate Liveness and Readiness

For Kubernetes deployments, consider using different endpoints:

- **Liveness probe**: Basic check that the application is running
- **Readiness probe**: Comprehensive check that the application can handle traffic (use this for load balancer health checks)

### Monitor Health Check Metrics

Regularly review which instances are being marked unhealthy to identify:

- Application stability issues
- Capacity problems
- Network connectivity issues

## Related Documentation

- [Load Balancers](load-balancers.md) - General load balancer configuration
- [Instance Pools](load-balancers.md#instance-pools) - Configure backend targets for your load balancer
