import React from 'react'

const DashboardIcon = ({isActive}:{isActive: boolean}) => {
  return (
    <div>
     <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M3.14286 2C2.83975 2 2.54906 2.12041 2.33474 2.33474C2.12041 2.54906 2 2.83975 2 3.14286V10C2 10.3031 2.12041 10.5938 2.33474 10.8081C2.54906 11.0224 2.83975 11.1429 3.14286 11.1429H7.71429C8.01739 11.1429 8.30808 11.0224 8.52241 10.8081C8.73674 10.5938 8.85714 10.3031 8.85714 10V3.14286C8.85714 2.83975 8.73674 2.54906 8.52241 2.33474C8.30808 2.12041 8.01739 2 7.71429 2H3.14286ZM11.1429 3.14286C11.1429 2.83975 11.2633 2.54906 11.4776 2.33474C11.6919 2.12041 11.9826 2 12.2857 2H16.8571C17.1602 2 17.4509 2.12041 17.6653 2.33474C17.8796 2.54906 18 2.83975 18 3.14286V5.44C18 5.7431 17.8796 6.03379 17.6653 6.24812C17.4509 6.46245 17.1602 6.58286 16.8571 6.58286H12.2857C11.9826 6.58286 11.6919 6.46245 11.4776 6.24812C11.2633 6.03379 11.1429 5.7431 11.1429 5.44V3.14286ZM11.1429 10C11.1429 9.6969 11.2633 9.40621 11.4776 9.19188C11.6919 8.97755 11.9826 8.85714 12.2857 8.85714H16.8571C17.1602 8.85714 17.4509 8.97755 17.6653 9.19188C17.8796 9.40621 18 9.6969 18 10V16.8571C18 17.1602 17.8796 17.4509 17.6653 17.6653C17.4509 17.8796 17.1602 18 16.8571 18H12.2857C11.9826 18 11.6919 17.8796 11.4776 17.6653C11.2633 17.4509 11.1429 17.1602 11.1429 16.8571V10ZM2 14.56C2 14.2569 2.12041 13.9662 2.33474 13.7519C2.54906 13.5376 2.83975 13.4171 3.14286 13.4171H7.71429C8.01739 13.4171 8.30808 13.5376 8.52241 13.7519C8.73674 13.9662 8.85714 14.2569 8.85714 14.56V16.8571C8.85714 17.1602 8.73674 17.4509 8.52241 17.6653C8.30808 17.8796 8.01739 18 7.71429 18H3.14286C2.83975 18 2.54906 17.8796 2.33474 17.6653C2.12041 17.4509 2 17.1602 2 16.8571V14.56Z" fill={isActive?"white":"white"}/>
</svg>

    </div>
  )
}

export default DashboardIcon