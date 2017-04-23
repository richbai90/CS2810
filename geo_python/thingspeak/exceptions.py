# All of the request exceptions so they can be caught trhough the thingspeak module

import requests.exceptions as exceptions


class HTTPError(exceptions.HTTPError):
    pass


class ConnectionError(exceptions.ConnectionError):
    pass


class ProxyError(exceptions.ProxyError):
    pass


class SSLError(exceptions.SSLError):
    pass


class Timeout(exceptions.Timeout):
    pass


class ConnectTimeout(exceptions.ConnectTimeout):
    pass


class ReadTimeout(exceptions.ReadTimeout):
    pass


class URLRequired(exceptions.URLRequired):
    pass


class TooManyRedirects(exceptions.TooManyRedirects):
    pass


class MissingSchema(exceptions.MissingSchema):
    pass


class InvalidSchema(exceptions.InvalidSchema):
    pass


class InvalidURL(exceptions.InvalidURL):
    pass


class InvalidHeader(exceptions.InvalidHeader):
    pass


class ChunkedEncodingError(exceptions.ChunkedEncodingError):
    pass


class ContentDecodingError(exceptions.ContentDecodingError):
    pass


class StreamConsumedError(exceptions.StreamConsumedError):
    pass


class RetryError(exceptions.RetryError):
    pass


class UnrewindableBodyError(exceptions.UnrewindableBodyError):
    pass


# Warnings


class RequestsWarning(exceptions.RequestsWarning):
    pass


class FileModeWarning(exceptions.FileModeWarning):
    pass
