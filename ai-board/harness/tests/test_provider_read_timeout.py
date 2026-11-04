"""Model transport: body read có trần thời gian thật (socket timeout chỉ chặn từng lần đọc)."""
import socket
import time

from providers.client import read_body


class Response:
    """HTTPResponse-like tối thiểu: `read()` đọc thẳng từ socket, `fp.raw._sock` để watchdog đóng."""

    def __init__(self, sock):
        self._sock = sock
        self.fp = type('Fp', (), {'raw': type('Raw', (), {'_sock': sock})()})()

    def read(self, amount=-1):
        return self._sock.recv(65536 if amount is None or amount < 0 else amount)


def test_stalled_gateway_times_out_instead_of_blocking_the_poll():
    local, peer = socket.socketpair()
    try:
        started = time.monotonic()
        try:
            read_body(Response(local), 0.2)
        except TimeoutError as error:
            assert 'not finished' in str(error)
        else:
            raise AssertionError('gateway treo phải hết hạn, không được chờ mãi')
        assert time.monotonic() - started < 5
    finally:
        local.close()
        peer.close()


def test_normal_body_is_returned_untouched():
    local, peer = socket.socketpair()
    try:
        peer.sendall(b'{"ok": true}')
        peer.shutdown(socket.SHUT_WR)
        assert read_body(Response(local), 5.0) == b'{"ok": true}'
    finally:
        local.close()
        peer.close()


def test_response_without_a_socket_is_read_plainly():
    class Plain:
        def read(self, amount=-1):
            return b'{"plain": true}'

    assert read_body(Plain(), 5.0) == b'{"plain": true}'


def test_early_eof_is_not_a_timeout():
    local, peer = socket.socketpair()
    try:
        peer.shutdown(socket.SHUT_WR)  # gateway đóng kết nối, không có body
        assert read_body(Response(local), 5.0) == b''
    finally:
        local.close()
        peer.close()
