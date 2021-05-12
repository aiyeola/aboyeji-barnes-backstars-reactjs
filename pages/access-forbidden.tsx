import React from 'react';
import Link from '@components/Link';

const AccessForbiddenPage = () => (
  <>
    <div id="access-forbidden">
      <div>403</div>
      <div id="txt">
        Forbidden <span className="blink">_</span>
      </div>
      <div>
        <Link href="/dashboard">Go Home</Link>
      </div>
    </div>
  </>
);

export default AccessForbiddenPage;
