import React from 'react'

export default function GoogleMapsIFrame() {
  return (
    <div className="w-full flex justify-center">
    <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d48285.194898667614!2d14.221954735587424!3d40.853772821381256!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x133b0841c2b97efd%3A0xfa8988155f754755!2sNapoli%20Napoli%20Rooms!5e0!3m2!1sit!2sit!4v1769122096539!5m2!1sit!2sit" width="1200" height="400" style={{ border: '0' }} allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
    </div>
  )
}
