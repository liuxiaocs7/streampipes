/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
package org.apache.streampipes.model.client.user;

import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;
import java.util.Set;

public class ServiceAccount extends Principal {

  private String clientSecret;

  public static ServiceAccount from(String serviceAccountName,
                                 String clientSecret,
                                 Set<Role> roles) {
    ServiceAccount account = new ServiceAccount();
    account.setPrincipalName(serviceAccountName);
    account.setClientSecret(clientSecret);
    account.setRoles(roles);
    account.setAccountEnabled(true);
    account.setAccountLocked(false);

    return account;
  }

  public ServiceAccount() {
    super(PrincipalType.SERVICE_ACCOUNT);
  }

  public String getClientSecret() {
    return clientSecret;
  }

  public void setClientSecret(String clientSecret) {
    this.clientSecret = clientSecret;
  }

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return null;
  }

  @Override
  public String getPassword() {
    return null;
  }

  @Override
  public String getUsername() {
    return null;
  }
}