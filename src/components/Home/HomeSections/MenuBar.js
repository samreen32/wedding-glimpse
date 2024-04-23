import React from 'react';
import "../home.css";

function MenuBar() {
    return (
        <>
            <div class="menu-container container">
                <input id="menu" type="checkbox" />
                <label for="menu">Menu</label>
                <ul class="menu">
                    <li>
                        <a href="#0">
                            <span>Upload images</span>
                            <i class="fas fa-address-card" aria-hidden="true"></i>
                        </a>
                    </li>
                    <li>
                        <a href="#0">
                            <span>View images</span>
                            <i class="fas fa-tasks" aria-hidden="true"></i>
                        </a>
                    </li>
                    <li>
                        <a href="#0">
                            <span>Upload videos</span>
                            <i class="fas fa-users" aria-hidden="true"></i>
                        </a>
                    </li>
                    <li>
                        <a href="#0">
                            <span>View All Assets</span>
                            <i class="fas fa-envelope-open-text" aria-hidden="true"></i>
                        </a>
                    </li>
                </ul>
            </div>


        </>
    )
}

export default MenuBar