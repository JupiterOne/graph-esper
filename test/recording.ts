import {
  setupRecording,
  Recording,
  SetupRecordingInput,
  mutations,
} from '@jupiterone/integration-sdk-testing';

export { Recording };

export function setupProjectRecording(
  input: Omit<SetupRecordingInput, 'mutateEntry'>,
): Recording {
  return setupRecording({
    ...input,
    redactedRequestHeaders: ['Authorization'],
    redactedResponseHeaders: ['set-cookie'],
    mutateEntry: (entry) => {
      redact(entry);
    },
    options: {
      matchRequestsBy: {
        url: {
          hostname: false,
          pathname: false,
        },
      },
    },
  });
}

function redact(entry): void {
  if (entry.request.postData) {
    entry.request.postData.text = '[REDACTED]';
  }

  if (!entry.response.content.text) {
    return;
  }

  //let's unzip the entry so we can modify it
  mutations.unzipGzippedRecordingEntry(entry);

  const responseText = entry.response.content.text;
  const parsedResponseText = JSON.parse(responseText.replace(/\r?\n|\r/g, ''));

  if (parsedResponseText.emm) {
    if (parsedResponseText.emm.signup_url) {
      parsedResponseText.emm.signup_url = '[REDACTED]';
    }

    if (parsedResponseText.emm.completion_token) {
      parsedResponseText.emm.completion_token = '[REDACTED]';
    }

    if (parsedResponseText.emm.enterprise_token) {
      parsedResponseText.emm.enterprise_token = '[REDACTED]';
    }
  }

  if (parsedResponseText.results) {
    for (const result of parsedResponseText.results) {
      if (result.versions) {
        for (const version of result.versions) {
          if (version.download_url) {
            version.download_url = '[REDACTED]';
          }

          if (version.icon_url) {
            version.icon_url = '[REDACTED]';
          }
        }
      }
    }
  }

  entry.response.content.text = JSON.stringify(parsedResponseText);
}
